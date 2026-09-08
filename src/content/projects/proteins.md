---
title: "Protein interaction modeling"
shortTitle: "Protein interaction modeling"
subtitle: "Disorder-informed machine learning for protein–protein interactions."
description: "Building richer datasets and models to study protein binding, with explicit attention to intrinsic disorder."
category: "AI for biology"
status: "Ongoing · Model training"
order: 3
color: blue
tags: ["Protein language models", "PyTorch", "Aurora"]
links: []
---
## Intrinsically disordered proteins

Intrinsically disordered proteins and regions are flexible: they do not adopt a single stable structure. Their changing conformations and binding interactions make them scientifically interesting and difficult to model.

My research asks whether we can predict binding partners for disordered proteins and ultimately support drug design for these targets. A central motivation is to model interactions while explicitly considering disorder, rather than relying only on a static structural picture.

## Bringing disorder into the model

The model augments sequence inputs with properties related to disorder, including disorder propensity and hydrophobicity. It uses ESM2-derived representations and intraprotein contact information alongside cross-attention to model relationships between proteins.

Training includes a distogram-prediction task using the PINDER dataset. The broader approach combines richer training data, architectural changes, and explicit disorder information in both the inputs and the eventual analysis.

## My contribution

As a DOE CSGF visiting graduate student at **Argonne National Laboratory**, advised by **Arvind Ramanathan**, I have worked on data curation, model architecture, and the training pipeline. I curated two large training datasets and developed the architecture now being trained on the **Aurora supercomputer**.

This work brings together scientific data preparation, protein language models, and large-scale computation. It also requires translating a biological question into training objectives and evaluation methods that can actually address it.

## Current progress

The datasets have been created, the architecture is largely established, and model training is in progress. There are no major predictive results to report yet. Future analysis will examine performance specifically for disordered proteins and regions, alongside broader protein-interaction benchmarks.

My visiting appointment was in 2024–2025, and the project remains ongoing. Additional results and public materials will be added as they become available.
