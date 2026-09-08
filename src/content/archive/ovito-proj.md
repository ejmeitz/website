---
title: "Visualizing atomic vibrations"
description: "Making vibrational modes in disordered materials easier to see and understand."
tags: ["Python", "OVITO", "Molecular simulation"]
image: "mode1737_localized.png"
alt: "A visualization of a vibrational mode localized in an atomic structure"
---
## Seeing a normal mode

Vibrations in a perfect crystal are relatively easy to picture as organized waves. In amorphous materials, the atomic motions can be much less intuitive.

I developed a Python script that interfaces with OVITO to animate the motion associated with a vibrational mode, given particle positions and the mode’s displacement pattern. The visualization helps connect mathematical eigenvectors with the physical motion of the atoms.

The original example below shows a vibrational mode in amorphous silicon. The motion is periodic even though it is less spatially organized than a simple wave in a crystal.
