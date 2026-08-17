{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  packages = [
    pkgs.nix-ld
    pkgs.nodejs_26
    pkgs.pnpm
  ];
}
