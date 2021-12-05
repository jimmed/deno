# jimmed/deno

A monorepo full of [deno][deno] libraries and tools

[![Unit tests](https://github.com/jimmed/deno/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/jimmed/deno/actions/workflows/unit-tests.yml)

---

# Contributing

## Set up a local developer environment

### Using `nix-direnv`

1. Install [`nix-direnv`][nix-direnv] into your shell.
2. Clone the repository and enable `direnv`:

   ```bash
   git clone git@github.com:jimmed/deno.git
   cd deno
   direnv allow
   ```

### Manually

1. Install [`deno`][deno] into your shell.
2. Clone the repository and pre-cache dependencies:

   ```bash
   git clone git@github.com:jimmed/deno.git
   cd deno
   deno cache {mod,dev_deps}.ts
   ```

[deno]: https://deno.land/
[nix-direnv]: https://github.com/nix-community/nix-direnv
