"use strict";

import { quadraticMapSequence } from "./lib/quadraticMapSequence.js";
import { Plotter } from "./lib/Plotter.js";
import { Complex } from "./lib/Complex.js";

const maxIterations = 100;

const canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("plot")
);
const ctx = canvas.getContext("2d");

const mPlotter = new Plotter(ctx);
mPlotter.setBounds(-1.5, 1, 1, -1);

const mandelbrot = (c) =>
  quadraticMapSequence(new Complex(0, 0), c, maxIterations);
mPlotter.plot(mandelbrot, maxIterations);

/*
document.getElementById('mplot').oncontextmenu = function () {
  mPlotter.setBounds(-1.5, 1, 1, -1);
  mPlotter.plot();
  return false;
};*/

// this.heightWidth = this.height / this.width;
// this.state = null;
// this.selected = [{ x: 0, y: 0 }];
// if (useEvents) {
//   this.canvas.onmousedown = function (ev) {
//     var
//       relX = ev.clientX - canvas.offsetLeft, relY = ev.clientY - canvas.offsetTop;

//     if (state === null && ev.which === 1) {
//       state = 'begin';
//       selected[0].x = relX;
//       selected[0].y = relY;
//     }
//   };

//   this.canvas.onmouseup = function (ev) {
//     var
//       relX = ev.clientX - canvas.offsetLeft, relY = ev.clientY - canvas.offsetTop, upperLeft, bottomRight, tmp;

//     if (state === 'begin' && ev.which === 1) {
//       state = 'waiting';

//       tmp = Math.abs((relX - selected[0].x) * heightWidth);
//       if (relY < selected[0].y) {
//         tmp = -tmp;
//       }
//       tmp = tmp + selected[0].y;

//       upperLeft = this.realToPlotCoord({
//         x: Math.min(selected[0].x, relX),
//         y: Math.min(selected[0].y, tmp)
//       });

//       bottomRight = that.realToPlotCoord({
//         x: Math.max(selected[0].x, relX),
//         y: Math.max(selected[0].y, tmp)
//       });

//       ctx.putImageData(plotImg, 0, 0);
//       that.setBounds(upperLeft.x, bottomRight.x, upperLeft.y, bottomRight.y);
//       that.plot();
//       state = null;
//     }
//   };

//   this.canvas.onmousemove = function (ev) {
//     var relX, relY, newHeight;
//     if (state === 'begin') {
//       relX = ev.clientX - canvas.offsetLeft;
//       relY = ev.clientY - canvas.offsetTop;

//       ctx.putImageData(plotImg, 0, 0);
//       newHeight = Math.abs((relX - selected[0].x) * heightWidth);

//       if (relY < selected[0].y) {
//         newHeight = -newHeight;
//       }

//       ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
//       ctx.fillRect(selected[0].x, selected[0].y, relX - selected[0].x, newHeight);
//     }
//   };
// }
// realToPlotCoord = function (p) {
//   var result = { x: null, y: null };

//   result.x = p.x * this.xScale + this.plotBounds.left;
//   result.y = -p.y * this.yScale + this.plotBounds.top;

//   return result;
// };
