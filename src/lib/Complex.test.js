import { Complex } from "./Complex.js";

describe("Complex Numbers", function () {
  it("init", function () {
    expect(true).toBe(true);
  });

  it("add operator", function () {
    const z = new Complex(1, 2);
    const c = new Complex(3, 4);

    const result = Complex.add(z, c);

    expect(result.re).toEqual(4);
    expect(result.im).toEqual(6);
  });

  it("multiplication operator", function () {
    const z = new Complex(1, 2);
    const c = new Complex(3, 4);

    const result = Complex.multiply(z, c);

    expect(result.re).toEqual(-5);
    expect(result.im).toEqual(10);
  });

  it("power of 2 operator", function () {
    const z = new Complex(1, 2);
    const result = Complex.pow2(z);

    expect(result.re).toEqual(-3);
    expect(result.im).toEqual(4);
  });

  it("module operator", function () {
    const z = new Complex(3, 4);

    expect(z.mod()).toEqual(5);
  });

  it("fast module operator (square module)", function () {
    const z = new Complex(3, 4);

    expect(Complex.mod2(z)).toEqual(25);
  });

  it("set angle", function () {
    const z = new Complex(3, 4);

    z.setAngle(0);
    expect(z.re).toEqual(5);
    expect(z.im).toEqual(0);
  });

  it("set module", function () {
    const z = new Complex(0, 1);

    z.setMod(5);
    expect(z.re).toEqual(0);
    expect(z.im).toEqual(5);
  });
});
