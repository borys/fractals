# Fractals

[![Run tests](https://github.com/borys/fractals/actions/workflows/run-test.yml/badge.svg)](https://github.com/borys/fractals/actions/workflows/run-test.yml)
[![Deploy to Pages](https://github.com/borys/fractals/actions/workflows/deploy.yml/badge.svg)](https://github.com/borys/fractals/actions/workflows/deploy.yml)

Toy-project, generating fractals using pure VanillaJS and canvas.
You may check it here: [>fractals<](https://borys.github.io/fractals/)

Project assumptions:

- written in VanillaJS
- no external libs required
- optionally use JsDoc with tsc for type checking
- tools like prettier, linter are allowed
- bundlers - conditionally allowed for minification
- should work in browser

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
