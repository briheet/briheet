---
title: Building a Persistent KV Store with B-epsilon Trees
date: 2026-02-14
slug: db
description: Research notes on building a persistent key-value store using B-epsilon trees in Rust. Exploring alternatives to LSM trees and diving into fractal tree implementations.
categories:
  - blogs
tags:
  - KV
  - Databases
  - Research
  - Rust
---

# Research Notes

I want to build a persistent key-value store based on B-epsilon trees.
I looked at LevelDB but it's written in C++, which isn't my preference. So I decided to write this in Rust since I haven't touched it in a while.
I'm also a bit tired of Go at this point due to its syntax, error handling, and GC overhead.

## Understanding LSM Trees

I started by learning about LSM trees. ScyllaDB has a good introductory article on it:

1. [LSM Trees](https://www.scylladb.com/glossary/log-structured-merge-tree/): Solid article explaining LSM tree fundamentals
2. [LSM Wiki](https://en.wikipedia.org/wiki/Log-structured_merge-tree): Wikipedia reference

After reading through the material, I felt LSM trees were a solid solution,
but I wanted something more interesting to work on. So I started looking for alternative data structures or papers that might offer better approaches to this problem.

## Discovering B-epsilon Trees

That's when I found B-epsilon trees. They combine the write performance of LSM trees with the read performance of B-Trees. Here are some resources:

1. [B-epsilon Tree Overview](https://blocksandfiles.com/2022/06/29/b%ce%b5-tree-b-epsilon-tree-beta-epsilon-tree/)
2. [Academic Paper (Stony Brook)](https://www3.cs.stonybrook.edu/~bender/newpub/2015-BenderFaJa-login-wods.pdf)

This looks promising. Time to dig into B-epsilon tree implementations and try writing one in Rust.

## B-epsilon Implementation in Rust

I went back to my competitive programming days for this. Although I was never great at competitive programming (terrible at remembering tricks), I loved implementing data structures from cp-algorithms.
So I started searching for articles and implementing.

Midway through, I learned about BetrFS which uses B-epsilon trees where epsilon is a tunable parameter, supposedly ranging between 0.3 and 0.5. I looked deeper and found TokuDB, which got acquired by Percona.
The interesting part is that it uses fractal trees, which from what I've read are similar to B-epsilon trees, but the buffer structure differs.
In B-epsilon trees, if I understand correctly, the buffer size is B - B^e, which gives good flexibility for tuning. I'll find out if this understanding is correct as I go deeper.

Here's the fractal tree source code: [PerconaFT](https://github.com/percona/PerconaFT).
The implementation is mainly in the `ft/` directory and appears to be largely unchanged from the original TokuDB implementation.
It's quite large and complex. Reading through this much C++ will be challenging, but I'll try to understand each operation one by one.

## Next Steps

So far I've read and watched a bunch of resources on this topic. Ig i'll have to do some more research on this, i am having a sleep call now :P

