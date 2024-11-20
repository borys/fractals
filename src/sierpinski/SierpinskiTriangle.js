"use strict";
import { Coord } from "./Coord.js";
import { Triangle } from "./Triangle.js";

export class SierpinskiTriangle {
  #triangles = [];

  /**
   * It takes triangle and return array of three triangles
   * @param {Triangle} triangle
   * @returns {Triangle[]}
   */
  #cutTriangle(triangle) {
    const midPoint0x1 = Coord.midPoint(
      triangle.vertices[0],
      triangle.vertices[1],
    );
    const midPoint0x2 = Coord.midPoint(
      triangle.vertices[0],
      triangle.vertices[2],
    );
    const midPoint1x2 = Coord.midPoint(
      triangle.vertices[1],
      triangle.vertices[2],
    );

    return [
      new Triangle(
        Coord.clone(triangle.vertices[0]),
        Coord.clone(midPoint0x1),
        Coord.clone(midPoint0x2),
      ),
      new Triangle(
        Coord.clone(midPoint0x1),
        Coord.clone(triangle.vertices[1]),
        Coord.clone(midPoint1x2),
      ),
      new Triangle(
        Coord.clone(midPoint0x2),
        Coord.clone(midPoint1x2),
        Coord.clone(triangle.vertices[2]),
      ),
    ];
  }

  /**
   * Generate sierpinski triangle from init triangle
   * @param {Triangle} initTriangle init triangle
   * @param {Number} steps iteration number
   */
  generate(initTriangle, steps) {
    let triangles = [initTriangle];
    for (let i = 0; i < steps; i++) {
      triangles = triangles.reduce(
        (acc, triangle) => [...acc, ...this.#cutTriangle(triangle)],
        [],
      );
    }
    this.#triangles = triangles;
  }

  /**
   * Render previously generated Sierpinski Triangle using provided 2d context
   * @param {CanvasRenderingContext2D} ctx 2d context used for render
   */
  render(ctx) {
    for (let triangle of this.#triangles) {
      triangle.render(ctx);
    }
  }
}
