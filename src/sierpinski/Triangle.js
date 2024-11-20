"use strict";
export class Triangle {
  vertices;

  constructor(v1, v2, v3) {
    this.vertices = [v1, v2, v3];
  }

  /**
   * Render triangle using passed context
   * @param {CanvasRenderingContext2D} ctx 2d canvas context used for render
   */
  render(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    ctx.lineTo(this.vertices[1].x, this.vertices[1].y);
    ctx.lineTo(this.vertices[2].x, this.vertices[2].y);
    ctx.closePath();
    ctx.fill();
  }
}
