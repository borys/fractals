"use strict";

import { quadraticMapSequence } from "./lib/quadraticMapSequence.js";
import { Plotter } from "./lib/Plotter.js";
import { Complex } from "./lib/Complex.js";

const maxIterations = 100;
const initPlotBounds = {
  left: -1.5,
  right: 1,
  top: 1,
  bottom: -1,
};

const canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("plot")
);
const ctx = canvas.getContext("2d");

const plotter = new Plotter(ctx);
plotter.setBounds(initPlotBounds);

const mandelbrot = (c) =>
  Math.floor(
    (quadraticMapSequence(new Complex(0, 0), c, maxIterations) /
      maxIterations) *
      255,
  );
plotter.plot(mandelbrot);

let selectionStart = null;
const plotSizeRatio = plotter.height / plotter.width;

canvas.addEventListener("mousedown", (ev) => {
  if (selectionStart) {
    return;
  }

  selectionStart = { x: ev.offsetX, y: ev.offsetY };
});

canvas.addEventListener("mouseup", (ev) => {
  if (!selectionStart) {
    return;
  }

  const width = ev.offsetX - selectionStart.x;
  const height =
    Math.sign(ev.offsetY - selectionStart.y) * plotSizeRatio * Math.abs(width);

  const selectionEnd = { x: ev.offsetX, y: selectionStart.y + height };

  const startCorner = plotter.mapToPlotCoordinates(selectionStart);
  const endCorner = plotter.mapToPlotCoordinates(selectionEnd);

  const newPlotBounds = {
    left: Math.min(startCorner.re, endCorner.re),
    right: Math.max(startCorner.re, endCorner.re),
    top: Math.max(startCorner.im, endCorner.im),
    bottom: Math.min(startCorner.im, endCorner.im),
  };

  plotter.setBounds(newPlotBounds);
  plotter.plot(mandelbrot);
  selectionStart = null;
});

canvas.addEventListener("mousemove", (ev) => {
  if (!selectionStart) {
    return;
  }

  const width = ev.offsetX - selectionStart.x;
  const height =
    Math.sign(ev.offsetY - selectionStart.y) * plotSizeRatio * Math.abs(width);

  ctx.putImageData(plotter.plotImage, 0, 0);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fillRect(selectionStart.x, selectionStart.y, width, height);
});

canvas.addEventListener("contextmenu", (ev) => {
  ev.preventDefault();
  ev.stopPropagation();

  plotter.setBounds(initPlotBounds);
  plotter.plot(mandelbrot);
});
