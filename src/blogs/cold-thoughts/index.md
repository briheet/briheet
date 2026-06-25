---
title: Cold thought i had today
date: 2026-06-25
slug: random
description: Just a few thoughts i had today, may sound weird
categories:
  - blogs
tags:
  - Programming
  - Random
---

Last night i was busy porting all the `Tokenizer` code from huggingface's tokenizer repo. Apparently
its written in rust and used by `Transformers` lib written in python. The way it works is that it calls
`self._tokenizer.encode_batch()`.
![Related Pic](./images/rust_call.png)
then calls the rust for fast Tokenizer impl here
[Click this for pointing to Rust implementation.](https://github.com/huggingface/tokenizers/blob/3ba8ad0061a885baf052bbb7bbd22857e73e0c4e/bindings/python/src/tokenizer.rs#L1312)

I was able to rewrite the whole implementation to zig via `parseSlicing` and getting `vocab`, `added_tokens` for Llama tokenizers.
It was working and everything was fine, took me the whole night to rewrite this. My mom usually wakes up at 5 in mornin
and i think my room's door was open. She saw i was up then told me to take some rest and i was like its just 12 and nopes, i didnt knew i was up the whole night.

As i was leaving my desk, something snapped and i deleted my whole codebase. I am pretty aware about myself, my surroudings, and things i usually do, how i feel.
I ended up deleting some more codebases i had some projects going on for no reason. It was a like a short moment i had where i rm -rfed a few things.
Then i proceed to to delete some of my transformers, golang notes and so from obsidian. Again, no reason at all.

It was all a reflex, just like a few seconds in time. Never had something like this before.

So i ended up not working on anything for the day. Took some time off pc, took my dog for a walk, had a few chocolates
and went to sleep.

Earlier i used to live with a couple of friends or even when visiting a few, i either used to get a beer or just hangout at the
nearest beach. Vizag's beaches are pretty great in this regrad. They're mostly quite deep from the start and hence
you see less people running down on them. Its pretty quiet and nice in this regrad.

So i ended up thinking what i really wanted to do. I work on backend stuff, do read a lot for designing better implementations,
diffusion model serving, inference optimisation, etc. I have been reading pipelines, schedulers impl, transformers if you do read
the start stuff and bunch of things.

But nah, i am really not sure what to go with. Should i pick a Stripe PM's role and chill
on a warm summer or should i be the person working 14 hours at 22 to pay for my college fees
and masters money. Also i take pride in telling this i have paid all my bachelors fees
back to my parents and do have some savings to last. 

I am really not sure what to do. Some people say coding is gone now they dont read the source code
and i am not sure how do they verify or want what they want. Its like hiring a maid and chopping of your
arms and getting dependent on maids food with a blind to your eyes.

There are people who just write typescript and are building memory layer and when asked about trie
or any sophisticated data structure may fold. I am not targetting the person or his skills at
this point because its their choices and not something gifted. A person can go to write pretty nice
software if he gets the right role at the right time. But does that happen with everyone ?
Also for the note i didnt knew `Tokenizers` used Aho - Corasick algo for pretokenising. I really need to read more.

So coming back, what should one do ? Sit in an interview expecting a question from inference optimisation
and getting asked a db query or learn all `torch.*` api and ended up getting asked `POST` internals and api basics.

Buidling is easy and not much of an problem as far as i have seen whether it be rewriting some complicated software
or library (especially with LLM's around to help you), then what is the differentiating part ? Staying at a org due to
a good college placement or network and ended up building a okayish career out of it ?

Also i am not really sure what to buid at this point. It was always something that may pulls some looks
which leads to networking or talks. At this point its all LLM glorified texts. Someone can copy all
of toy compiler from some toy implementation and call it out as his which sounds insane, but its not really ones.

But i do like this part of interviews, if you lets say somehow find an interview and the interviewer is a nice person,
they usually end up asking you about your experience rather than writing down some dsa questions or some obscure
interface problem implementation.

