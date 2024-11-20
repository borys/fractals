"use strict";
import { Color } from "./Color.js";
import { Complex } from "./Complex.js";
import { Position } from "./Position.js";

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

  /**
   * plot width in pixels
   */
  get width() {
    return this.context.canvas.offsetWidth;
  }

  /**
   * plot height in pixels
   */
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

  /**
   * Sets new plot bounds
   * @param {{ left: number, right: number, top: number, bottom:number }} bounds new plot bounds
   */
  setBounds(bounds) {
    this.#plotBounds = bounds;
    this.#xScale = (bounds.right - bounds.left) / this.width;
    this.#yScale = (bounds.top - bounds.bottom) / this.height;
  }

  /**
   * Maps position in pixels to position in plot coordinates
   * @param {Position} param0 position in pixels
   * @returns complex number in plot coordinates
   */
  mapToPlotCoordinates({ x, y }) {
    return new Complex(
      x * this.#xScale + this.#plotBounds.left,
      -y * this.#yScale + this.#plotBounds.top,
    );
  }

  /**
   * Set pixel color at provided position
   * @param {Position} param0 position in pixels
   * @param {*} color color to set
   */
  #setPoint({ x, y }, color) {
    const bytesPerPixel = 4;
    const { plotImage } = this;

    const pixelIdx = (y * plotImage.width + x) * bytesPerPixel;

    plotImage.data[pixelIdx] = color.r;
    plotImage.data[pixelIdx + 1] = color.g;
    plotImage.data[pixelIdx + 2] = color.b;
    plotImage.data[pixelIdx + 3] = color.a;
  }

  /**
   * This callback is displayed as part of the Requester class.
   * @callback PlotCallback
   * @param {Complex} pos processed number
   * @returns color index number between 0-255
   */
  /**
   * Prepares plot using provide function
   * @param {PlotCallback} generate
   */
  plot(generate) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const point = this.mapToPlotCoordinates({ x, y });
        const colorIdx = generate(point);
        this.#setPoint({ x, y }, this.#colorMap[colorIdx]);
      }
    }

    this.context.putImageData(this.plotImage, 0, 0);
  }
}
