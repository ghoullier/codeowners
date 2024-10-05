# codeowners

Provide utilities to parse and explore codeowners

> This Project rely on [bun](https://bun.sh) toolchain

## Installation

```sh
npx jsr add @ghoullier/codeowners
```

## Basic Usage

```typescript
import { parse } from "@ghoullier/codeowners";

const codeowners = parse(`
# Core
package.json @org/team1
## Packages
packages/app1 @org/team1
packages/app2 @org/team2
[`);

/*
[
    ["package.json", ["@org/team1"]],
    ["packages/app1", ["@org/team1"]],
    ["packages/app2", ["@org/team2"]],
]
*/
```

## How to contribute ?

See [jsr.io official documentation](https://jsr.io/docs/publishing-packages)

### Install project

```sh
bun install
```

### Run test

```sh
bun test
```

### Build the project

```sh
bun run build
```
