{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    typescript
    typescript-language-server
    prettierd
  ];
  
  shellHook = ''
  '';
}
