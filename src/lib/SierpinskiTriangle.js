"use strict";
import { Position } from "./Position.js";
import { Triangle } from "./Triangle.js";

export class SierpinskiTriangle {
  /** @type {Triangle[]} */
  #triangles = [];

  /**
   * It takes triangle and return array of three triangles
   * @param {Triangle} triangle
   * @returns {Triangle[]}
   */
  #cutTriangle(triangle) {
    const midPoint0x1 = Position.midPoint(
      triangle.vertices[0],
      triangle.vertices[1],
    );
    const midPoint0x2 = Position.midPoint(
      triangle.vertices[0],
      triangle.vertices[2],
    );
    const midPoint1x2 = Position.midPoint(
      triangle.vertices[1],
      triangle.vertices[2],
    );

    return [
      new Triangle(
        Position.clone(triangle.vertices[0]),
        Position.clone(midPoint0x1),
        Position.clone(midPoint0x2),
      ),
      new Triangle(
        Position.clone(midPoint0x1),
        Position.clone(triangle.vertices[1]),
        Position.clone(midPoint1x2),
      ),
      new Triangle(
        Position.clone(midPoint0x2),
        Position.clone(midPoint1x2),
        Position.clone(triangle.vertices[2]),
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
