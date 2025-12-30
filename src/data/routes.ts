export interface Route {
  name: string;
  href?: string;
  submenu?: Route[];
}

export const routes: Route[] = [
  {
    name: "About",
    href: "About",
  },
  {
    name: "Proyects",
    href: "#proyects",
  },
  {
    name: "Experience",
    href: "#experience",
  },
  {
    name: "What I use btw",
    submenu: [
      {
        name: "Linux",
        href: "/linux",
      },
      {
        name: "Terminal",
        href: "/terminal",
      },
      {
        name: "Web Dev",
        href: "/webdev",
      },
      {
        name: "servers",
        href: "/servers",
      },
    ],
  },
  {
    name: "Dotfiles",
    href: "#dotfiles",
  },
  {
    name: "Contact",
    href: "#contact",
  },
  // {
  //   name: 'Blog',
  //   href: 'blog.armany.dev',
  // }
];
