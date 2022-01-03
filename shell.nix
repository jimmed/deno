{ pkgs ? import <nixpkgs> { } }:
with pkgs;
mkShell {
  buildInputs = [ bashInteractive deno git github-cli nixfmt ];
  shellHook = "deno cache {mod,deps,dev_deps}.ts";
}
