---
title: Mentor Notes for Golang
date: 2026-02-07
slug: golang
description: Opinionated mentoring notes on Golang - from project structure to design patterns. Self-taught perspectives that might help you get going.
categories:
  - blogs
tags:
  - Golang
  - Mentoring
  - Backend
---

## Before You Start

I've never had mentors, coaches, or seniors telling me what to do. Most of my knowledge comes from reading open source projects, source code, rewriting stuff on my own, reading blogs, watching conferences, picking up words, searching them, and going deep. The only hand I had from someone was my dad when I was 9-10, when he introduced me to terminals (that's a story for another blog).

Take this with a grain of salt if something seems wrong or incorrect. These are just my thoughts.

## Golang

Go is a language built for systems, not just backends. Hence things like TUIs, backends, CLI tools, etc. are built in Go.

### Resources You Should Know

1. [Go Official Docs](https://go.dev/doc/) - The official documentation. You should get a good idea about various things from here, mainly core Go stuff.
2. [DevDocs Go Reference](https://devdocs.io/go/) - You don't need to learn this by heart, just give it a glance on weekends.
3. [Apollo Backend](https://github.com/christianselig/apollo-backend) - One of the best basic Go backends ever written. It was the iOS Reddit (Apollo) official backend for a while. Start reading from `main.go` and google each and every line. That's how you learn good programming.
4. [Go Conferences](https://www.youtube.com/results?search_query=golang+conference) - In your free time, go through Go conference videos. Conferences are where people with years of experience share their knowledge. Interviews often test conference-based knowledge and concurrency.
5. **Standard Library** - Most code is library-based and you'll need to learn the standard library. Look into core packages used daily: `net/http`, `strings`, `bufio`, `sync`. This will put you in a strong position. Most Go engineers in corporate settings use Go just for writing code, so you'll have an advantage if you know the internals in detail.

## Project Structure

When you start a project, define the entrypoint in a `cmd` directory at the root. The entrypoint in any application is a CLI. This CLI is useful for starting your backend, applying migrations, spinning up workers, and many other things.

**For CLI:** Use [Cobra](https://cobra.dev/). Here's a [good example of how Cobra is structured](https://github.com/christianselig/apollo-backend/blob/main/internal/cmd/root.go).

**For Config:** After your code enters the program, it should first load all the config. Config can live in many places: YAML files, TOML files, [Vault](https://www.hashicorp.com/en/products/vault), etc. Use [Viper](https://github.com/spf13/viper) for this. With Viper, you define structs with tags. You can also use the Go validator package to validate if values are nil while loading. Saves you a ton of headache.

## Design Patterns

After setup, you start designing your overall project. One way to understand and develop a project is to first know good design patterns and writing conventions. As a junior engineer, I followed this approach and have never had issues with it in any project so far, whether freelancing or org projects.

For language conventions, I follow the [Uber Go Style Guide](https://github.com/uber-go/guide). Usually gets the job done. The most important things include the functional options pattern, error handling and propagation, and similar patterns.

For repo design, it's quite varied. When you're working on a specific backend project, it can be domain repository pattern, concurrency pattern, or something else entirely. I'd say it's better to google your requirements, find good patterns, and implement them.

### Don't Force Patterns From Other Languages

One of the weirdest things I've seen is people from different languages bringing in patterns and forcing them onto Go. For example, Go and Java are quite different languages. You can't bring Java factory patterns (the only horror I've witnessed) into Go, which has a different design based on interfaces and methods. That's pretty weird. Similarly, I can't take the Go approach to Rust and implement it there. Future devs are gonna curse me for it.

Learning design patterns and the idioms of the language, then structuring business requirements around that, is a good way to build a project. Personally, I like event-driven patterns when writing low-latency systems. Pretty robust, less mental overhead. So far it's worked well for me.

## Beyond Code

A few days ago I was in Rust's Discord watching people in a voice channel talking about Rust. Most of the talks were about types, macros, enums, and Rust-specific things, but they were pretty good. Early in my career, I started with Python, then switched to C++ for competitive programming. Hanging out on Discord and talking to people about languages, choices, and requirements shaped a lot of my thinking on programming and what's needed to develop good software.

A few things I value when writing code: a good language, good docs, good environment.

### Recommended Reading

1. [Algorithmica](https://en.algorithmica.org/hpc/) - As a performance nerd, I really liked this. It gives a general overview of systems, hardware, optimizations, etc.
2. [Zig's Codebase](https://codeberg.org/ziglang/zig) - At the time of writing, Zig 0.16 has a nice, small codebase to read. I used to hit "go to definition" on functions and ended up reading how it's divided at the OS level. You can see different paths for different OSes pretty easily. Nice reference material.
3. [Go's Codebase](https://github.com/golang/go) - Although very mature, it's worth going through. I was implementing a TCP server in Go and ended up finding an issue that wasn't removed, then reading the discussion on why. It's nice to spend 10 minutes on such things. At least I like it.
4. [Go Perf Dev](https://goperf.dev/) - A performance guide I use when optimizing, benchmarking, etc. Very good stuff.

## Final Thoughts

The further you go from the hardware, the more things break down. Stay close to compiled languages, try to rewrite a lot of things repeatedly, and join an org that values these things. I think spending my good years working on things that aren't performant or well-crafted is a waste. Though my priorities may change as life goes on.

Also, a good type system is a crazy benefit. I was at a functional programming talk recently where the author emphasized Lean and mathematics - it was good. I guess not using JSON and JavaScript is truly a blessing.
