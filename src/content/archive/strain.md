---
title: "Tracking tissue deformation"
description: "Image processing and animated strain maps for soft-tissue mechanical tests."
tags: ["MATLAB", "Computer vision", "Visualization"]
image: "maskImg.PNG"
alt: "An image-processing mask used to locate pins holding a tissue sample"
---
## Following motion without strain beads

The polarized-light camera imaged tissue and gels during mechanical testing, but conventional strain beads could not be used. I developed a MATLAB image-processing workflow to track the pins holding the tissue in place.

The resulting displacement measurements are used to approximate deformation and display an animated strain map. The workflow connects image analysis to a visual explanation of how the sample moves.

[Explore the strain-tracking code](https://github.com/ejmeitz/StrainApproximationandVisualization).
