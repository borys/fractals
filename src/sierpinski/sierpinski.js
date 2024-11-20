"use strict";

import { Coord } from "./Coord.js";
import { SierpinskiTriangle } from "./SierpinskiTriangle.js";
import { Triangle } from "./Triangle.js";

const canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("plot")
);
const width = canvas.width;
const height = canvas.height;
const context = canvas.getContext("2d");
const gradient = context.createLinearGradient(0, 0, width, height);

gradient.addColorStop(0, "#0000FF");
gradient.addColorStop(1, "#00FF00");

context.fillStyle = gradient;

const initTriangle = new Triangle(
  new Coord(width / 2, 0),
  new Coord(width, height),
  new Coord(0, height),
);

const sierpinski = new SierpinskiTriangle();
sierpinski.generate(initTriangle, 5);
sierpinski.render(context);

const steps = document.getElementById("steps");

steps.addEventListener("input", (event) => {
  if (!(event.target instanceof HTMLInputElement)) {
    throw new Error('Expected input element')
  }

  sierpinski.generate(initTriangle, +event.target.value);
  context.clearRect(0, 0, width, height);
  sierpinski.render(context);
});
