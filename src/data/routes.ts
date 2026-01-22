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
    href: "#whatIUseBtw",
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
