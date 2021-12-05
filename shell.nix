{ pkgs ? import <nixpkgs> { } }:
with pkgs;
mkShell {
  buildInputs = [ deno git github-cli nixfmt ];
  shellHook = "deno cache {mod,dev_deps}.ts";
}
