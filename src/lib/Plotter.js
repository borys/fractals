"use strict";
import { Color } from "./Color.js";
import { Complex } from "./Complex.js";

export class Plotter {
  #plotBounds = { left: null, right: null, top: null, bottom: null };
  /** @type {Color[]} */
  #colorMap = [];
  /** @type {number} */
  #xScale;
  /** @type {number} */
  #yScale;

  /** @type {CanvasRenderingContext2D} */
  context;

  get width() {
    return this.context.canvas.offsetWidth;
  }

  get height() {
    return this.context.canvas.offsetHeight;
  }

  /** @type {ImageData} */
  plotImage;

  /**
   *
   * @param {CanvasRenderingContext2D} context2d
   */
  constructor(context2d) {
    this.context = context2d;
    this.plotImage = this.context.createImageData(this.width, this.height);
    this.#colorMap = Array.from(
      { length: 256 },
      (_, c) =>
        new Color(Math.floor((c * c) / 255), Math.floor((c * c) / 255), c, 255),
    );
  }

  setBounds({ left, right, top, bottom }) {
    this.#plotBounds.left = left;
    this.#plotBounds.right = right;
    this.#plotBounds.top = top;
    this.#plotBounds.bottom = bottom;

    this.#xScale = (right - left) / this.width;
    this.#yScale = (top - bottom) / this.height;
  }

  mapToPlotCoordinates({ x, y }) {
    return new Complex(
      x * this.#xScale + this.#plotBounds.left,
      -y * this.#yScale + this.#plotBounds.top,
    );
  }

  setPoint({ x, y }, color) {
    const bytesPerPixel = 4;
    const { plotImage: plotImg } = this;

    const pixelIdx = (y * plotImg.width + x) * bytesPerPixel;

    plotImg.data[pixelIdx] = color.r;
    plotImg.data[pixelIdx + 1] = color.g;
    plotImg.data[pixelIdx + 2] = color.b;
    plotImg.data[pixelIdx + 3] = color.a;
  }

  /**
   *
   * @param {*} generate
   */
  plot(generate) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const point = this.mapToPlotCoordinates({ x, y });
        const colorIdx = generate(point);
        this.setPoint({ x, y }, this.#colorMap[colorIdx]);
      }
    }

    this.context.putImageData(this.plotImage, 0, 0);
  }
}
