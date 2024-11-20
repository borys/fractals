"use strict";
import { Color } from "./Color.js";
import { Complex } from "./Complex.js";

export class Plotter {
  ctx;
  width;
  height;
  plotImg;
  plotBounds = { left: null, right: null, top: null, bottom: null };
  xScale;
  yScale;
  colorMap = [];

  /**
   *
   * @param {CanvasRenderingContext2D} context2d
   */
  constructor(context2d) {
    this.ctx = context2d;
    this.width = context2d.canvas.offsetWidth;
    this.height = context2d.canvas.offsetHeight;
    this.plotImg = this.ctx.createImageData(this.width, this.height);
    this.colorMap = this.getColorMap();
  }

  getColorMap() {
    return Array.from(
      { length: 256 },
      (_, c) =>
        new Color(Math.floor((c * c) / 255), Math.floor((c * c) / 255), c, 255),
    );
  }

  setBounds(left, right, top, bottom) {
    this.plotBounds.left = left;
    this.plotBounds.right = right;
    this.plotBounds.top = top;
    this.plotBounds.bottom = bottom;

    this.xScale = (right - left) / this.width;
    this.yScale = (top - bottom) / this.height;
  }

  mapToPlotCoordinates({ x, y }) {
    return new Complex(
      x * this.xScale + this.plotBounds.left,
      -y * this.yScale + this.plotBounds.top,
    );
  }

  setPoint({ x, y }, color) {
    const bytesPerPixel = 4;
    const { plotImg } = this;

    const pixelIdx = (y * plotImg.width + x) * bytesPerPixel;

    plotImg.data[pixelIdx] = color.r;
    plotImg.data[pixelIdx + 1] = color.g;
    plotImg.data[pixelIdx + 2] = color.b;
    plotImg.data[pixelIdx + 3] = color.a;
  }

  plot(generate, maxIterations) {
    const { width, height } = this.plotImg;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const point = this.mapToPlotCoordinates({ x, y });
        const iterations = generate(point);

        const colorIdx = Math.floor((iterations * 255) / maxIterations);
        this.setPoint({ x, y }, this.colorMap[colorIdx]);
      }
    }

    this.ctx.putImageData(this.plotImg, 0, 0);
  }
}
