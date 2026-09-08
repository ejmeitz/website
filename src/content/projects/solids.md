---
title: "Quantum anharmonic thermodynamics"
shortTitle: "Solid-state thermodynamics"
subtitle: "From fundamental physics to high-throughput materials calculations."
description: "Making accurate thermodynamic predictions accessible, from quantum effects at low temperature to strongly anharmonic solids."
category: "Solid-state physics"
status: "Published & ongoing research"
order: 1
color: rust
tags: ["Lattice dynamics", "HPC", "Julia & Python"]
links:
  - label: "Read the thermodynamics preprint ↗"
    href: "https://doi.org/10.21203/rs.3.rs-10541555/v1"
  - label: "CrystalCumulants.jl ↗"
    href: "https://github.com/ejmeitz/CrystalCumulants.jl"
  - label: "Read the heat-capacity paper ↗"
    href: "https://doi.org/10.1103/PhysRevB.111.064305"
---
## Research overview

The atoms in a solid are always moving. Their collective vibrations help determine how much energy a material stores, how it expands when heated, and how it transports heat. A simple picture treats those vibrations as independent harmonic oscillators. Real materials are more complicated: their vibrations interact, and quantum effects matter at low temperatures.

My PhD research develops practical ways to capture this complexity. I combine statistical mechanics, lattice dynamics, and high-performance computing to make accurate material-property calculations faster and easier to use.

## Free-energy cumulant expansion

**Quantum Anharmonic Phonon Thermodynamics from the Free Energy Cumulant Expansion** is a preprint currently in review. The workflow revisits theory developed in the 1960s, evaluates it using modern parallel computation, and adds a rapidly convergent estimator for the reference-energy contribution and its temperature derivatives.

The method combines a self-consistent phonon reference with the first and second free-energy cumulants, including quantum effects and anharmonicity through quartic order. It provides direct access to Helmholtz free energy, internal energy, entropy, and heat capacity. It avoids the molecular-dynamics or path-integral trajectories used by the thermodynamic-integration reference workflow.

The resulting workflow requires fewer tuning choices and makes it practical to evaluate many temperatures and volumes. Those calculations enable equation-of-state fits and predictions of lattice constants and thermal expansion, and provide a route toward high-throughput materials screening.

## Benchmark results

- **Classical Lennard–Jones argon and Stillinger–Weber silicon:** free energies are within **0.25 meV/atom** of thermodynamic integration across the temperatures studied, at comparable computational cost and with a simpler workflow.
- **Quantum Lennard–Jones neon:** the workflow is **one to two orders of magnitude faster** than the estimated TI-PIMD comparison because it avoids path-integral simulations. The comparator scales measured classical timings by the path-integral bead count; it is not a directly measured end-to-end TI-PIMD runtime.
- **Quantum neon accuracy:** predicted lattice constants and internal energies are within **0.004 Å** and **0.05 meV/atom**, respectively, of the reference.

These are results for the tested model systems, not universal error bounds. The expansion is truncated, and the calculation addresses vibrational thermodynamics rather than electronic or magnetic contributions.

## My contribution

I implemented the final workflows, derived and implemented the reference-energy correction, collected the data, and wrote the manuscript. Aloïs Castellano implemented the exact first- and second-cumulant expressions. Alan McGaughey and Gerald Wang supervised the research; all authors contributed to theoretical discussions and debugging.

The workflow is available through **CrystalCumulants.jl**, with Julia and Python interfaces. The cumulant terms are also implemented in the TDEP package, giving other researchers a way to use and extend the work.

## Earlier work: heat capacity, mode by mode

My 2025 Physical Review B paper, **Phonon mode resolved anharmonic heat capacity of solids**, develops a framework for resolving anharmonic heat capacity into individual vibrational modes. It explores how mode self-interactions and interactions between modes change the harmonic picture.

For the tested temperatures, the instantaneous-normal-mode approach predicts the total potential-energy heat capacity of Lennard–Jones argon within 1.1%; the temperature-dependent effective-potential approach performs best for Stillinger–Weber silicon, within 0.7%. Understanding these mode-level contributions can improve the heat-capacity inputs used in high-temperature thermal-transport calculations.

## In progress: learning the phonons of disordered solids

I am developing an ML framework that predicts **second-order interatomic force constants**: the quantities that describe the local stiffness of the atomic energy landscape and determine phonon modes.

The goal is to capture force constants in alloys and disordered systems that challenge conventional approaches. This work connects my grounding in lattice dynamics with machine learning for materials. The framework is in development; results and implementation details will be shared as the work progresses.
