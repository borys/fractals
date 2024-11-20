"use strict";
export class Complex {
  re = 0;
  im = 0;

  /**
   * Creates new complex number
   * @param {number} re real part of number
   * @param {number} im imaginary part of number
   */
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }

  /**
   * Returns complex angle
   * @returns complex angle
   */
  angle() {
    return Math.atan2(this.im, this.re);
  }

  /**
   * Sets new angle on current number
   * @param {number} newPhi new angle
   * @returns this number
   */
  setAngle(newPhi) {
    const r = this.mod();
    this.re = Math.cos(newPhi) * r;
    this.im = Math.sin(newPhi) * r;
    return this;
  }

  /**
   * Return module of current number
   * @returns module of current number
   */
  mod() {
    return Math.sqrt(Complex.mod2(this));
  }

  /**
   * Sets new mod
   * @param {number} new_mod new mod
   * @returns current number
   */
  setMod(new_mod) {
    const current_mod = this.mod();

    if (current_mod === 0) {
      throw new Error("Cant't set mod for (0,0)");
    }

    const ratio = new_mod / current_mod;
    this.re = this.re * ratio;
    this.im = this.im * ratio;

    return this;
  }

  /**
   * Returns result of multiplication
   * @param {*} a first factor
   * @param {*} b second factor
   * @returns a multiplied by b
   */
  static multiply(a, b) {
    return new Complex(a.re * b.re - a.im * b.im, a.im * b.re + a.re * b.im);
  }

  /**
   * Raise provided number to power of 2
   * @param {Complex} n complex number
   * @returns number to power 2
   */
  static pow2(n) {
    return new Complex(n.re * n.re - n.im * n.im, 2 * n.re * n.im);
  }

  /**
   * Returns mod raised to power of 2 for provided number
   * |z|^2
   * @param {Complex} n complex number
   * @returns length raised to power of 2
   */
  static mod2(n) {
    return n.re * n.re + n.im * n.im;
  }

  /**
   * Adds two complex numbers
   * @param {Complex} x first addition component
   * @param {Complex} y second addition component
   * @returns sum
   */
  static add(x, y) {
    return new Complex(x.re + y.re, x.im + y.im);
  }
}
