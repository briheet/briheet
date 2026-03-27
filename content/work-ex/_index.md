This page includes my work experience over the time. This is in latest to oldest order.

## Socratese software solutions (Present)

**Place**: Remote (London, United Kingdom) \
**Type**: Part time \
**Timeline**: Feb 2025 - Present \
**Position**: Engineer \
**Work**:
* Low latency work. Optimisations over the base. Mostly dealt with golang a bit of deployment. 
* Includes optimisation on arm64 (no laptop for x86_64 :sob:), profiling, benching, etc. 
* Dealing with browser flows via har retireval of workflows and findings gaps to optimize, things to take advantage of to compete better.
* Hetzner server benchmarking for better server proximity. Basically all the things one can take advantage of.


## Cozy.Art (Present)

**Place**: Remote (Denver, Colorado, United States) \
**Type**: Full time \
**Timeline**: July 2025 - Present \
**Position**: Golang Engineer \
**Work**: 
* Writing infrastructure for Gen AI Media. 
* Dealing with orchestrators, workers in python (pytorch) and rust (candle-rs) to generate media by inferencing on media providers such as runpod. 
* Dealing deployments with nixos-anywhere and deploy-rs on vm's via flakes. Also managing db and backups on neon, blob at digital ocean spaces. 
* Built a video streaming platform serving about 60k+ users at peak via HLS. Good traffic retension and good money flow.
* The previous system had a mysql instance with media as internal file system which was the bottleneck and file serving issue hence did migrate the whole system alone to postgres and cloudflare r2 and ceph as backup.
* We had the requirement to use SpacetimeDB but it didnt had golang client hence ended up write a client for it to be used by our system to interact.


## Ameeba

**Place**: Remote (Sunnyvale, California, United States) \
**Type**: Part time \
**Timeline**: Oct 2025 - Nov 2025 \
**Position**: Golang Backend Engineer \
**Work**:
* Writing a reverse proxy in pure golang.
* Had some hardcore requirements to deal with systems for privacy hence custom proxy implementation.
* mTLS, oidc, authn, authz, and a bunch of features. 


## Backend Engineer Intern

**Place**: Remote (Miami, Florida, United States) \
**Type**: Full time \
**Timeline**: Feb 2025 - May 2025 \
**Position**: Intern \
**Work**:
* Writing trading gateways for coinbase international, coinbase us.
* Used FIX, websockets for market data, Resolved a bunch of bugs due to the pre use of AI.
* Tests and stuff. Got a 6 month offer but left after a sometime due to a better ops.
