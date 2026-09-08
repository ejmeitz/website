---
title: "cuNumeric.jl"
shortTitle: "cuNumeric.jl"
subtitle: "cuNumeric.jl brings distributed CPU and GPU computing to Julia array programs."
description: "A Julia interface to NVIDIA’s cuPyNumeric stack, making multi-node, multi-GPU computation easier to use."
category: "Scientific computing"
status: "Open-source · Active development"
order: 2
color: green
tags: ["Distributed computing", "GPU kernels", "Julia"]
links:
  - label: "Explore cuNumeric.jl ↗"
    href: "https://github.com/JuliaLegate/cuNumeric.jl"
  - label: "Read the documentation ↗"
    href: "https://julialegate.github.io/cuNumeric.jl/"
---
## Distributed array computing in Julia

Large scientific calculations often need more memory and compute than a single GPU can provide. Scaling them across a cluster typically asks researchers to learn a second discipline: distributed programming, communication libraries, and hardware-specific execution.

**cuNumeric.jl** wraps and extends NVIDIA’s cuPyNumeric library to give Julia users a familiar array interface for distributed CPU and GPU computation. The underlying Legate runtime handles the distribution of work. Researchers can express supported calculations with array operations without manually orchestrating MPI, CUDA, or NCCL.

## Project background

I originated the project and co-develop it with a fellow DOE CSGF recipient. We approached NVIDIA at the 2024 Supercomputing conference and have met with their team weekly since then.

Development is shared. I primarily focus on the Julia interface, while my collaborator focuses more on the underlying Legate runtime and memory management. This division lets us connect Julia’s programming model to the execution machinery that makes distributed computation possible.

## Automatic kernel fusion

One of my main contributions is automatic fusion of Julia broadcast expressions. Instead of executing each elementwise operation as a separate kernel, the interface combines supported expressions into a fused kernel. This can reduce kernel-launch overhead and intermediate work.

My implementation uses a backend task written by my collaborator to execute CUDA kernels within NVIDIA’s Legate/cuPyNumeric stack. The contribution spans language-level behavior and the practical constraints of a distributed GPU runtime.

```julia
# Familiar array expressions are the interface.
# A supported broadcast expression can become one fused kernel.
@. result = a * x + b * y
```

This is an illustrative expression; array creation, runtime setup, and supported operations are described in the package documentation. The project is under active development.

## Demonstrating performance

We have benchmarked core operations against cuPyNumeric and worked on Gray–Scott reaction–diffusion simulations as a scientific example. The Julia interface has demonstrated performance parity for tested core operations. Detailed benchmark plots, including hardware and problem-size information, will be added here.

## Talks & podcast

I presented **cuNumeric.jl: Automating Distributed Numerical Computing** with D. Krasowska at JuliaCon 2025. An upcoming CSGF podcast discusses this project, the NVIDIA collaboration, and the experience of working with an advisor who also held the fellowship.
