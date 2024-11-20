"use strict";

export class Coord {
  x;
  y;

  /**
   *
   * @param {Number} x x coordinates
   * @param {Number} y y coordinates
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Clones coordinates
   * @param {Coord} c cloned coordinates
   * @returns Coord
   */
  static clone(c) {
    return new Coord(c.x, c.y);
  }

  /**
   * Returns coordinates of middle point between points passed as arguments
   * @param {Coord} a first point coordinates
   * @param {Coord} b second point coordinates
   * @returns { Coord }
   */
  static midPoint(a, b) {
    return new Coord((a.x + b.x) / 2, (a.y + b.y) / 2);
  }
}
