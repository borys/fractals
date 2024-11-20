"use strict";

import { quadraticMapSequence } from "./lib/quadraticMapSequence.js";
import { Plotter } from "./lib/Plotter.js";
import { Complex } from "./lib/Complex.js";

const maxIterations = 10;
const plotBounds = { left: -2, right: 2, top: 2, bottom: -2 };

const initC = new Complex(-0.4, 0.6);
const julia = (z_0) =>
  Math.floor(
    (quadraticMapSequence(z_0, initC, maxIterations) / maxIterations) * 255,
  );

const canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("plot")
);
const ctx = canvas.getContext("2d");

const plotter = new Plotter(ctx);
plotter.setBounds(plotBounds);

let angle = initC.angle();
setInterval(() => {
  angle = angle + 0.1;
  initC.setAngle(angle);
  plotter.plot(julia);
}, 100);
