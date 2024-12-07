# Fractals

[![Run tests](https://github.com/borys/fractals/actions/workflows/run-test.yml/badge.svg)](https://github.com/borys/fractals/actions/workflows/run-test.yml)
[![Deploy to Pages](https://github.com/borys/fractals/actions/workflows/deploy.yml/badge.svg)](https://github.com/borys/fractals/actions/workflows/deploy.yml)

Toy-project, generating fractals using pure VanillaJS and canvas.
You may check it here: [>fractals<](https://borys.github.io/fractals/)

Scope:

- implement animated Julia Set
- implement Mandelbrot Set with zoom
- implement Sierpinski Triangle with controlling of steps
- use VanillaJS
- without using external libs
- optionally use JsDoc with tsc for type checking
- tools like prettier, linter are allowed
- should work without bundlers in browser
- bundlers conditionally allowed for minification

## Julia and Mandelbrot set

We are given following sequence:

```math
\begin{align*}
z_{n+1} = z_{n}^{2} + c \\
z_n, c \in \mathbb{C}
\end{align*}
```

**Mandelbrot Set:** for given $z_0 = 0$, find set of $c$ for which sequence converges

**Julia Set:** for given $c$ find set of $z_0$ for which sequence converges

Given sequence is convergent when $|z_{n}| < 2$ for $n \rightarrow \infty$.
For simplification I've assumed that if $|z_{n}| < 2$ is true for f.e. 100 iterations it is considered to be convergent. For nicer effect, I also colored numbers for which the sequence is divergent (color ~ first $n$ that $|z_n| >= 2$).

## Install, Build, Run

EcmaScript Modules need to follow CORS politics. This means that it need http server to work.

Development:

```bash
pnpm install
pnpm dev
```

Production:

```bash
pnpm install
pnpm build
pnpm preview
```
