"use strict";

import { Position } from "./lib/Position.js";
import { SierpinskiTriangle } from "./lib/SierpinskiTriangle.js";
import { Triangle } from "./lib/Triangle.js";

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
  new Position(width / 2, 0),
  new Position(width, height),
  new Position(0, height),
);

const sierpinski = new SierpinskiTriangle();
sierpinski.generate(initTriangle, 5);
sierpinski.render(context);

const steps = document.getElementById("steps");

steps.addEventListener("input", (event) => {
  if (!(event.target instanceof HTMLInputElement)) {
    throw new Error("Expected input element");
  }

  sierpinski.generate(initTriangle, +event.target.value);
  context.clearRect(0, 0, width, height);
  sierpinski.render(context);
});
