import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../utils/cn";
import themes from "../data/themes.json";
import type { Theme } from "../types/themes";

interface Link {
  name: string;
  href: string;
  icon?: any | undefined;
}

const links: Link[] = [
  {
    name: "Proyects",
    href: "#proyects",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export const Header = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll();

  const [currentTheme, setCurrentTheme] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(true);
  const [background, setBackground] = useState<string>("");

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
        setBackground("bg-transparent shadow-none");
      } else {
        setBackground("bg-base-300/60 backdrop-blur header-shadow");
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const changeTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      if (window.matchMedia("(prefers-color-scheme: dark)")?.matches) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    } else {
      setCurrentTheme(theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const newTheme = event.matches ? "dark" : "light";
        changeTheme(newTheme);
      });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "top-3 fixed w-full max-w-3xl px-3 justify-self-center place-self-center rounded-box z-5000 flex items-center",
          className,
          background,
        )}
      >
        <div className="drawer">
          <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar">
              <div className="flex-1 lg:hidden">
                <label
                  htmlFor="nav-drawer"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2">Home</div>
              <div className="hidden flex-none lg:block">
                <ul className="menu menu-horizontal">
                  {/* Navbar menu content here */}
                  {links.map((l: Link, i: number) => (
                    <li key={i}>
                      <a href={l.href}>{l.name}</a>
                    </li>
                  ))}
                  <li>
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btnbtn-ghostbtn-sm"
                      >
                        {themes.find((t) => t.name === currentTheme)?.emoji ||
                          "🎨"}
                      </div>
                      <ul
                        tabIndex={-1}
                        className={`dropdown-content rounded-box menu menu-vertical min-w-52 flex-nowrap max-h-[50dvh] overflow-auto gap-3 bg-accent-focus bg-opacity-30 p-3 shadow-lg backdrop-blur-md backdrop-brightness-75 md:max-h-[70vh] w-auto`}
                      >
                        {themes.map((t: any) => (
                          <li
                            key={t.name}
                            data-theme={t.name}
                            className="rounded-btn antialiased"
                          >
                            <button
                              onClick={() => changeTheme(t.name)}
                              className={`${currentTheme === t.name && "ring ring-accent "} flex items-center justify-between`}
                            >
                              <div>
                                {t.emoji} {t.name}
                              </div>
                              <div className="inline-flex items-cente space-x-1">
                                <div className="w-3 h-3 bg-primary rounded-full" />
                                <div className="w-3 h-3 bg-secondary rounded-full" />
                                <div className="w-3 h-3 bg-accent rounded-full" />
                                <div className="w-3 h-3 bg-neutral rounded-full" />
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="nav-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              {links.map((l: Link, i: number) => (
                <li key={i}>
                  <a
                    href={l.href}
                    className={cn("relative items-center flex space-x-1")}
                  >
                    <span className="block sm:hidden">{l.icon}</span>
                    <span className="hidden sm:block text-sm">{l.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
