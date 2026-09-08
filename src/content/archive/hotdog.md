---
title: "The thermodynamics of a hot dog"
description: "A heat-transfer class project that went from a radial numerical model to a real cooking experiment."
tags: ["Heat transfer", "MATLAB", "Numerical methods"]
image: "hotdogs.jpg"
alt: "Hot dogs cooking on a grill"
---
## Modeling cooking time

In a Spring 2020 heat-transfer project, our team modeled how long a hot dog would take to cook. We first considered a lumped-capacitance approximation, but the calculated Biot number was above 0.1, indicating that internal temperature gradients could not be neglected.

We developed a radial finite-difference model in MATLAB, with equations for the center, interior, and surface nodes. The model predicted a cooking time of **353 seconds**, compared with **402 seconds** in the experiment. The test conditions did not exactly match the model, including an initial-temperature difference.

The comparison was a useful lesson in connecting a numerical model to an imperfect experiment.

[View the MATLAB model](https://github.com/ejmeitz/Radial-Finite-Differencing-Model--Cooking-a-HotDog).
