---
title: Workex
description: Work experience in latest-to-oldest order.
---

This page includes my work experience over time. This is in latest-to-oldest order.

## Cozy.Art

**Place**: Remote (Denver, Colorado, United States) \
**Type**: Full time \
**Timeline**: July 2025 - May 2026 \
**Position**: Software Engineer \
**Work**:

- Writing infrastructure for Gen AI Media.
- Dealing with orchestrators and workers in Python (PyTorch) and Rust (candle-rs) to generate media by inferencing on media providers such as RunPod.
- Dealing with deployments using nixos-anywhere and deploy-rs on VMs via flakes. Also managing database and backups on Neon, with blobs at DigitalOcean Spaces.
- Built a video streaming platform serving about 60k+ users at peak via HLS, with good traffic retention and revenue flow.
- The previous system had a MySQL instance with media as the internal file system, which was the bottleneck and file serving issue. Migrated the whole system to Postgres, Cloudflare R2, and Ceph as backup.
- We had a requirement to use SpacetimeDB, but it did not have a Golang client, so I wrote a client for our system to interact with it.

## Socratese Software Solutions

**Place**: Remote (London, United Kingdom) \
**Type**: Part time \
**Timeline**: Feb 2025 - April 2025 \
**Position**: Engineer \
**Work**:

- Low latency work. Optimisations over the base. Mostly dealt with Golang and a bit of deployment.
- Includes optimisation on arm64, profiling, benchmarking, etc.
- Dealing with browser flows via HAR retrieval of workflows and finding gaps to optimize, things to take advantage of to compete better.
- Hetzner server benchmarking for better server proximity. Basically all the things one can take advantage of.

## Ameeba

**Place**: Remote (Sunnyvale, California, United States) \
**Type**: Part time \
**Timeline**: Oct 2025 - Nov 2025 \
**Position**: Golang Backend Engineer \
**Work**:

- Writing a reverse proxy in pure Golang.
- Had some hardcore requirements to deal with systems for privacy, hence custom proxy implementation.
- mTLS, OIDC, authn, authz, and a bunch of features.

## GoQuant

**Place**: Remote (Miami, Florida, United States) \
**Type**: Full time \
**Timeline**: Feb 2025 - May 2025 \
**Position**: Intern \
**Work**:

- Writing trading gateways for Coinbase International and Coinbase US.
- Used FIX and WebSockets for market data. Resolved a bunch of bugs due to the previous use of AI.
- Tests and stuff. Got a 6 month offer but left after some time due to a better opportunity.
