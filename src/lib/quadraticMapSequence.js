"use strict";
import { Complex } from "./Complex.js";

/**
 * Checks if sequence
 * z_(n + 1) = z_n^2 + c
 * has boundary for provided z_0 and c
 * return iteration number after which
 * it is considered to be divergent
 * @param {Complex} z_0 z_0 argument
 * @param {Complex} c c argument
 * @param {number} maxIterations limit number of iterations
 * @returns iterations number
 */
export function quadraticMapSequence(z_0, c, maxIterations) {
  let i = 0;
  let z_n = z_0;

  while (i < maxIterations && Complex.mod2(z_n) < 4) {
    z_n = Complex.add(Complex.pow2(z_n), c);
    i++;
  }

  return i;
}
