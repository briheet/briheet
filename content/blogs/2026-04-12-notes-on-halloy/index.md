---
title: Notes on reading halloy source code
date: 2026-04-12
slug: Rust
description: This is my personal notes of diving into halloy source code, an IRC application written in Rust.
categories:
  - blogs
tags:
  - Rust
  - Iced
  - Notes
  - Gui
---

# Intro

Hey, how's it going ? Hope you're doing well.

From some days, i have been trying out iced direct from create and soruce code but whenever i
write it i feel i am not writing rust in a idomatic way. So i thought to read a open source
codebase to understand a popular project on how to write a system from start to end, find design
decisions, why something is written in someway and how can i learn from it and write my own
applications end to end.

These are my personal notes, this can be wrong and well as right. Dont take this seriously.
Not only halloy, i would maybe also quote other projects as Helix to understand its codebase
try to get some good ways to write something.

# Start

The programs inits with src/main.rs with return of Result<(), Box<dyn std::error::Error>>. The reason of Box is due to dynamic dispatch of trait.
Its a way for generic programming. The compiler wants to know at compile time 
