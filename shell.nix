{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    bun
    typescript
    typescript-language-server
    prettierd
  ];
  
  shellHook = ''
  '';
}
