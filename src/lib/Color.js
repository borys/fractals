"use strict";
export class Color {
  /** @type {number} */
  r;
  /** @type {number} */
  g;
  /** @type {number} */
  b;
  /** @type {number} */
  a;

  /**
   * Creates color
   * @param {number} r red
   * @param {number} g green
   * @param {number} b blue
   * @param {number} a alpha
   */
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}
