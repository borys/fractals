"use strict";

export class Position {
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
   * @param {Position} c cloned coordinates
   * @returns Coord
   */
  static clone(c) {
    return new Position(c.x, c.y);
  }

  /**
   * Returns coordinates of middle point between points passed as arguments
   * @param {Position} a first point coordinates
   * @param {Position} b second point coordinates
   * @returns { Position }
   */
  static midPoint(a, b) {
    return new Position((a.x + b.x) / 2, (a.y + b.y) / 2);
  }
}
