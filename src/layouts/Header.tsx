import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "../utils/cn";
import themes from "../data/themes.json";
import { routes, type Route } from "@/data/routes";

export default function Header({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(true);
  const [background, setBackground] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
        setBackground("bg-transparent shadow-none");
      } else {
        setBackground("bg-base-300/60 backdrop-blur shadow-xl");
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
        className={cn("fixed px-20 z-50 w-full")}
      >
        <div className="drawer">
          <input
            id="menu-drawer"
            type="checkbox"
            className="drawer-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <div className="drawer-content">
            {/* NAVBAR AND HEADER CONTENT */}
            <div
              className={cn(
                "top-2 fixed navbar w-full max-w-[96dvw] md:max-w-3xl px-3 justify-self-center place-self-center rounded-box flex items-center",
                className,
                background,
              )}
            >
              <div className="navbar-start">
                <label
                  htmlFor="menu-drawer"
                  className={`${menuOpen && "swap-active"} btn btn-square btn-ghost drawer-button swap swap-rotate`}
                >
                  <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  {/* close icon */}
                  <svg
                    className="swap-on fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </label>
              </div>
              <div className="navbar-center">
                <a
                  href="/"
                  className="btn btn-ghost text-primary! font-mono font-bold text-3xl"
                >
                  Armany
                </a>
              </div>
              <div className="navbar-end">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-square"
                  >
                    {themes.find((t) => t.name === currentTheme)?.emoji || "🎨"}
                  </div>
                  <ul
                    tabIndex={-1}
                    className="menu dropdown-content bg-base-300 max-h-[70dvh] overflow-auto flex-nowrap gap-y-2 rounded-box z-1 mt-4 w-60 p-2 shadow-2xl"
                  >
                    {themes.map((t: any) => (
                      <li
                        key={t.name}
                        data-theme={t.name}
                        className="antialiased rounded-field"
                      >
                        <label
                          htmlFor={`theme-${t.name}`}
                          onClick={() => changeTheme(t.name)}
                          className={`${currentTheme === t.name && "ring-2 ring-base-content"} w-full flex items-center justify-between`}
                        >
                          <input
                            type="radio"
                            name="theme-dropdown"
                            id={`theme-${t.name}`}
                            className={`theme-controller sr-only`}
                            aria-label={t.name}
                            value={t.name}
                          />
                          <div className="text-nowrap">
                            {t.emoji} {t.name}
                          </div>
                          <div className="inline-flex items-center flex-nowrap space-x-1">
                            <div className="w-3 h-3 bg-primary rounded-full" />
                            <div className="w-3 h-3 bg-secondary rounded-full" />
                            <div className="w-3 h-3 bg-accent rounded-full" />
                            <div className="w-3 h-3 bg-neutral rounded-full" />
                          </div>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="drawer-side Z-100">
            <label
              htmlFor="menu-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu md:menu-lg lg:menu-xl bg-base-200 rounded-box m-2 min-h-[98dvh] shadow-2xl  w-52 md:w-60 lg:w-80 p-4">
              {routes.map((l: Route, i: number) =>
                l.href ? (
                  <li key={i}>
                    <a href={l.href}>{l.name}</a>
                  </li>
                ) : (
                  <div key={i} tabIndex={0} className="collapse collapse-arrow">
                    <div className="collapse-title font-semibold">{l.name}</div>
                    <div className="collapse-content text-sm">
                      <ul className="menu md:menu-lg lg:menu-xl bg-base-200 rounded-box m-2 min-h-[98dvh] shadow-2xl  w-52 md:w-60 lg:w-80 p-4">
                        {l.submenu.map((s: Route, j: number) => (
                          <li key={j}>
                            <a href={s.href}>{s.name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
