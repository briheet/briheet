---
title: Multithreading and Some Rust
date: 2026-05-03
slug: multithreading-rust
description: General notes on multithreading, its advantages and disadvantages, and how Rust approaches it.
categories:
  - blogs
tags:
  - Multithreading
  - Rust
---

# Multi-threaded programming

## Notes
This repo contains source and understanding of multithread programs.
After writing a lot of concurrent code, i saw a bunch of people fighting over java, go and rust's model.
Though i might relearn and try everything in rust coz why not!
Would also like to thanks Britney Spears and Gwen Stefani for accompanying me when i was writing this UwU;

I feel one should not touch multi threaded programming or concurrency untill and unles he/she/they understand how its being processed
on their hardware. This knowledge leads to writing better/maintainable programs, else it is a mess usually.

So normal programs are usually sequential programs. They usually execute sequentially irl.
But, instruction level parallelism do happen in them aswell. So usually programs are not always in sequence.
Also, instruction level parallelism should not be confused with concurrency.

So instruction level parallelsim happens in two ways, Hardware and software.
In hardware, the processor decides which instructions to process in parallel.
In software, the compiler plans, ahead of time of which instructions to process in parallel.

Lets see this example:
```text
a = b + c
d = e + f
g = a + d
```
As you can see in the above example, `a` and `d` can be computed individually without depending upon each other.

The goal of compiler and processors is to identify and take advantage of instruction level parallelism.
Some ways ILP is achieved is:

1. Register renaming: Resue of registers. It abstracts logical registers from physical registers. Logical registers have
physical registers associated with them and physical registers cannot be referenced directly. Hence it eleminates false dependencies.

2. Instruction pipelining: It attempts to keep every part of processor busy by dividing instruction execution into stages
performed by different processor units. When a program is processed, different instructions can be in different stages of the
pipeline at the same time. This is a kind of overlap, not the same thing as fully executing multiple independent instructions at once.
In a pipelined computer architecture, pipeline registers are placed after every stage. These store intermediate results so the next stage
can continue work on the following clock cycle. This improves throughput, although a single instruction still takes multiple stages to finish.

3. Superscalar processors: We have here 2 kinds of processors, scalar and superscalar. The basic distinction is that scalar processors
usually execute a single instruction per clock cycle, whereas superscalar processors can issue multiple instructions per clock cycle.
This is achieved by having multiple execution units and issue logic that can dispatch independent instructions to them in parallel.
This is different from vector or SIMD execution, where one instruction operates on many data elements at once. In a superscalar CPU,
the dispatcher reads instructions and sends them to available execution units. This does increase the complexity of dependency checking,
register renaming, and scheduling, and it can also cost more power.

4. Branch prediction: Its a digital circuit which tries to predict which way a branch will go before this is known definitely.
It is a microarchitectural feature of modern processors that helps keep the pipeline busy. Programmers do not directly "use" branch prediction,
but code with predictable control flow often runs better because the processor can guess the next path more accurately. If i remember correctly,
the `[[likely]]` attribute which came in C++20 gives the compiler a hint that a specific path is more probable than another, although that is not
the same thing as directly controlling the hardware branch predictor.
A branch predictor usually tries to guess which conditional jump instruction will be taken.
Branch misprediction also happens and the cost is usually number of clock cycles from fetch, decode and execute stage.
You can say it can cost from about 10 - 20 clock cycles, which is a lot. Its a huge topic so lets not go more init.

Also superscaler and instruction pipelining are considered two different things. Superscaler processors are usually pipelined.


So more specifically, multithreaded paradigm has provided better ways to high throughput computing.
So there are 3 specific types of computing, high throughput, high performance and many tasking computing.

1. High throughput computing: This is usually concerend with large and reliable processing of data. This can be for a short time as well as long time.
Time limit concerend here is more from months to years.

2. High performance computing: It integrates things from parallel computing to distributed computing. Interestingly i was looking for a master course
in distributed systems ig was from university of sweden which had a course on HPC. Let me not talk about it or else HPC nerds would do a crashout on me.

3. Many tasks computing: Its is usually the middle ground between high performance/throughput computing.
It tries to use many computing resources in a very short amount of time to execute many tasks.
Cost analysis is done in tasks per seconds here.


So, there is no single recipe when you want to do throughput computing. Common techniques include:

1. Multithreading
2. Multiprocessing
3. Async I/O
4. Batching and pipelining
5. Vectorization
6. Distributed systems

### Advantages

Lets say we have some process going on with a single thread. A single thread can have cache misses, cannot be able to fully
use computing resources of a CPU, this generally feels into ineffiency. Hence multithreading can help other thread access this
to their advantage and use em. Pretty good right. But i feel if a particular program is written in a good way, perfing is done,
one should be able to find issues and make multithreaded code perform better. Which leads to the thoughts whether it is really
useful or not.

### Disadvantages

Multiple threads can interfer with each other when sharing hardware and resources, these can be caches for example.
Hence, execution time is not generally improved when compared to a single thread. Also, it can also be degraded if you consider
access same resources and access to shared resources with locks can cause waits.

There is a [Hyper-Threading](https://en.wikipedia.org/wiki/Hyper-threading) technology from intel which has
said to very helpful and has shown improvement on x86 microprocessors. For every Processor core, the operating system
identitfies 2 virtual core and tries to share the workload between them. It mainly wants to increase the number of independent instructions in
pipeline. Hence it takes the advantage of superscaler architecture processor which helps to process data in parallel.

But it has a set of issues due to vulnerability. Said, a malicious thread can take advantage by monitoring the memory access pattern of another thread
which it shares is cache with. Hence ig OpenBSD disabled hyper threading.

## Types

1. Temporal multithreading (simple context switching)
The simplest and navie way of multithreading one knows is lets say a thread is executing till it gets blocked by a event.
This event can be a cache miss, which will take more cpu clock cycles to get the data and return. Hence this would create
a long latency time for it to wait. Hence multithreading allows to switch to another to execute until it gets ready to be executed again.
Also, here hardware that supports multithreading is required and also helps a lot to increase the speed, lowering the latency stall.


2. Fine-grained multithreading
This usually works by switching between threads very frequently, sometimes every cycle, to hide latency and reduce the impact of stalls.
It does not remove data dependencies entirely, but it can keep the processor busy when one thread is waiting.

3. Simultaneous multithreading
This is what usually happens in current processors or you can say processors with superscaler architecture.
They take the advantage that superscaler architecture processors can execute multiple instructions from threads from every cpu cycle.
Also we know every thread does not have all instructions which can be processed in multiple executions, hence it usually works.

Example:
1. Cycle i: instructions x and x + 1 from thread A and instructions y, y + 1 and y + 2 from thread B are issued.
2. Cycle j: instructions x + 2 from thread A, y + 3 from thread B, z and z + 1 from thread C are issued.

But yes its not always threads which can be counted on hand, those instructions can be seen by naked eyes. Hence we
would need something like a thread scheduler. It usually picks what thread to pick next to execute and maintain hierachy of stalled
ones to execute next. Thread scheduling algorithms are usually on both software and hardware level.
These help with resource sharing, thread-sensitive scheduling (this takes thread info like feedback to choose best threads to execute together), tasks seperation.


## Rust Overlook

Rust as a memory safe programming langauge says multi threading can cause
`Race conditions (data), Deadlocks(between 2 threads), Hard to produce bugs(donno what type)`.
So usually a programming language needs to talk to the operating system (which all do via a API), 

When one reads the thread api given by rust's standard library, we get to see how this languages really
exposes multithreading in general. You can find the api at Rust docs [Click Me](https://docs.rs/rustc-std-workspace-std/latest/std/thread/index.html)

# Simple multithreaded programs

Easiest way to write multi threaded programs is via `thread::spwan`



<To be continued>
