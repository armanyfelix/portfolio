export interface Stack {
  name: string;
  description: string;
  preview: string;
  url: string;
}

const linux: Stack[] = [
  {
    name: "Nix OS",
    description:
      "The endgame distro for me, al principio no me convencia porque me gusta estar probando diferentes cosas y con nix ese proceso se vuelve mas tedioso, al fin ",
    preview: "",
    url: "https://nixos.org/download/",
  },
  {
    name: "KDE Plasma",
    description: "",
    preview: "",
    url: "",
  },
  {
    name: "Niri",
    description: "",
    preview: "",
    url: "",
  },
];

const terminal: Stack[] = [
  {
    name: "",
    description: "",
    preview: "",
    url: "",
  },
];

const webdev: Stack[] = [
  {
    name: "DaisyUI",
    description:
      "This is a very simple UI library that uses classes instead of components, making it highly configurable. I used it in this portfolio.",
    preview: "",
    url: "",
  },
];

const servers: Stack[] = [
  {
    name: "",
    description: "",
    preview: "",
    url: "",
  },
];

export { linux, terminal, webdev, servers };
