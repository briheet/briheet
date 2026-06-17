---
title: Zangetsu - A desktop application for media generation
date: 2026-06-17
slug: zangetsu
description: Zangetsu is a self hosted application for media generation via adapters, workers by inference on on-demand pods on runpod.
categories:
  - blogs
tags:
  - Go
  - Tauri
  - Diffusion
  - Runpod
---

# Why I built Zangetsu ?

Hey there, how's it going ? \
I have been working with diffusion based adapters and workers for a while. \
Few of my friends were curious to as what they are and how can they generate media from them aswell.
There are a lot if places one can go, nanobana and multiple places. However most of they are either slow,
hard to keep track of generated media, costly, yade yade yada.

This prompted me to build something which is easy to use, doesn't cost that much, has a desktop based application
which is fast, small binary, performant and looks good aswell.
Hence i ended up building zangetsu. Below is the full architecture and design decision i took while building it.

# System Architecture

The architecture is pretty simple as i didnt want to spend much time on it and get it working asap. Here is the rough diagram.

![Archi](./images/architecture.png)

As you can see looks a bit messy. Sure can do better on this. Main components are Desktop application written in Tauri,
Backend wirtten in golang with net/http, Orchestrator written in golang with grpc, inference worker written in python with diffusers,
and supporting infra as postgres, rustfs (minio i miss you), redis, zitadel as auth, zot as image registry (worker images) and traefik.

# High Level and Components

On a high level, a person usually select a type of generation he wants by choosing a particular adapter. Goes to the generation page,
inputs his prompt which is then sent to `Backend API`, from where is gets built as jobs with number of generations, variations if so,
and posted in postgres table. The main scope of backend here is building jobs, frontend api infos, settings, workspaces, users queries
, etc.

The job then gets picked up by `Orchestrator` by periodic jobs provided by `Riverqueue` which polls searching for pending jobs
in DB (i know this is bad and should be an event maybe use nats here would be a right choice but its just a operational overhead
as compared to something that is required here).

Now its info is picked, do a lot of checks. To save money, this system uses model based jobs allocation. Diffusers library provides us
with hotswapping loras which is quite nice. Hence we can have a model runnning on a pod, which loras and generate media ratner than
having to start a new runpod worker which if RTX 5090 would cost us $1 dollar an hour more.

So yea we use Runpod's API, our image gets pulled via Zot registry which uses RustFS as storage. Image pulling and running on runpod which
takes about 200 mb/sec speed on our 4.2 gb docker image. As huggingface models are cached on runpod we dont usually have to pay the cold
start price for it but yea its still slow due to pulling. I have detailed more on this in the inference section.

Pulling in loras, doing a warmup of pipeline and sending a conn to orchestrator via inference worker and sending the status to ready.
After generation, all generated media is stored in RustFS via presigned url and made available to application.

# Components in detail and decision

## Edge and Authentication

Traefik is sitting at the edge as a reverse proxy. It routes auth traffic to Zitadel and backend traffic to the Go API.
Zitadel handles login through OIDC. The app talks to Zitadel directly for login, gets a token, then sends that token to the backend.
Backend does not do password auth. It only validates the bearer token and then checks Zangetsu workspace permissions.


## Backend API

Backend is a simple service written in Go. Its a simple `Cobra` based cli which has commands for API, postgres migrations.
![Prof](./images/perf.png)

At base it is a `Domain - Repository` pattern. I havent had any issues so far with it. Lets me easily swap between different different implementation
rather than being fixed on one. Its also pretty nice as one cannot lock himself or has to do a lot of rewriting when adding a new
service or component. For migrations i use `golang migrate`.

![Tests](./images/testcontainers.png)
I am a test driven person so it helps injecting dependencies with ease. All tests are mostly written with
`TestContainers`. I find it really easy and nice to have. One can easily apply all migrations and state, have a snapshot and retrieve it in another test.
Thats it, backend usually deals with Accounts, Workspace, Catalogue, Render, Assets, Collections routes, etc. I use `uber/zap` for our logger.

## Orchestrator

I wanted something which is lightweight, can go down and still recover state. Hence i ended up adding an Orchestrator to the stack.
![Orchestrator](./images/orchestrator.png)
Its all written in golang, has worker given by `Riverqueue`. It uses it on Postgres to poll queued jobs.
When it finds one, it checks what model and GPU profile is needed. If an idle pod already matches the model,
it reuses it. If not, it asks Runpod to create a new pod with the worker image.
This matters because cold starts are expensive. Reusing a pod that already has the model loaded saves time and money.
Also same model different loras still go to the same pod to make it less expensive. Makes me save alot of money.

I asked a few people on Golang's discord and a few seniors, they either suggested me to have a source of truth or add a `shim` process
by it. But i think having a ditributed lock or shim would be a bit overkill.


## Data, Object Store and Auth

We have `Postgres` and our source of truth. It is paired with `PgAdmin`. It stores all user data, catalogue, render jobs, generations, etc.
RustFS is used for the heavy stuff: uploaded files, LoRAs, references, previews and generated outputs. I mostly use presigned urls.
Till now i have used almost all from s3 to digital ocean spaces to minio to dynamodb.

I wanted to self host this to keep costs down for now hence first choice was minio but the maintenance mode got me.
Hence i tried using RustFS and it hasnt caused any problems till now.
I have a job running for taking postgres dumps everyday via `pg_dump`. I was thinking to keep backups at BackBlaze but nah.

For Auth, as people say its quite not good to write your own auth. Hence i ended up with Zitadel. Its nice and simple to use. No issues so far.
You can write its infra via `terraform`. Check Zitadel's website for more.


## Inference Worker Runtime (py, zig ?)

The inference worker is Python because diffusion tooling is best there. The code is mostly a Click cmd WorkerRuntime. 
When the worker starts, it connects back to the orchestrator over secure gRPC and says it is ready. The orchestrator then sends it one render job.

The worker downloads LoRAs and input assets using presigned URLs, loads or reuses the model pipeline, runs inference, uploads output files, and reports progress back.
Worker does not touch Postgres. Worker does not get long-lived storage keys. Worker just does the GPU work.

![Worker](./images/inference_worker.png)

I did use optimum-cli to get onnx but it was will onnx be cached on runpod ? It has a community but i dont know, i will try after sometime thoo.


## Observability

There is Prometheus and Grafana for metrics.
Backend exposes HTTP and DB metrics. Orchestrator exposes queue, worker, Runpod and gRPC metrics.

I mainly care about a few things:
- is the API healthy?
- is the render queue growing?
- are workers connecting?
- are pods slow to start?
- are renders failing?

I never worked much on observability in detail so yea that was it.

## Tooling and dependencies

Tooling wise i mostly used were `nix` paired with `direnv`. Editor is `Helix` terminal is `Alacritty`.
I don't like installing random tools globally for every project, so the repo has a small `shell.nix` with the things needed to work on it.
Although i have a flake named tools in my home-manager setup having all the tools it required, i did use direnv mostly for this.
My `.envrc` and `shell.nix` is basically 
![Tooling](./images/nix.png)


# Things i'd improve or change

I think i over did with grpc as in worker. Could've been websockets but i think its fine i am quite comfortable with it.
Pod cleanup and stale worker reconciliation can also get better. GPU systems fail in boring ways, so the cleanup jobs also need to be boring and reliable.

There is a lot of places over the network things will go weird. I remember RTX 5090 was not able to pull docker image even for 15 minutes.
The thing is one cannot depend on anything externally to be stable. There should always be ways to counter fails and fix them.

I would also rewrite worker as zig inference with onnx or candle-rs that's Rust, but thats a personal project.I dont really find python
any intutive. Coming from Go, Rust and Zig, its one of the worst things i wrote. I think programming golang for so long i kept reaching out for
```go
if err != nil {
  // do something
}
```
in my code in places where i think it should've been. Also i dont know its tooling is not that good.
I tried accessing its lsp stuff but found it quite bad. I was always reaching for source code to read info.

Riverqueue is quite good, but i think writing my own worker would've been good. Riverqueue attaches to postgres
and one does Riverqueue migrations to setup its tables in Postgres. 
