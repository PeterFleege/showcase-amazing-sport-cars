// src/components/navigation/Navbar.tsx

"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import LINKS from "@/lib/constants/nav-links";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);

    // Hide when scrolling down past the hero, reveal on scroll up
    setHidden(latest > previous && latest > 600 && !open);
  });

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open
            ? "border-b border-gold-500/15 bg-ink/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-20 max-w-375 items-center justify-between px-6 lg:px-12"
        >
          <a
            href="#top"
            className="group flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-500/60 transition-colors group-hover:border-gold-300">
              <span className="font-display text-lg leading-none text-gold-400">
                A
              </span>
            </span>
            <span className="font-display text-xl tracking-[0.32em] text-bone">
              AMAZING<span className="text-gold-500"> SPORTS CARS</span>
            </span>
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-bone/80 transition-colors hover:text-gold-300"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-gold-400 transition-all duration-500 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden border border-gold-500/70 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.3em] text-gold-300 transition-all duration-500 hover:bg-gold-500 hover:text-ink sm:inline-block"
            >
              Private Viewing
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-11 w-11 place-items-center lg:hidden"
            >
              <span
                className={`absolute h-px w-6 bg-bone transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.25"
                }`}
              />
              <span
                className={`absolute h-px w-6 bg-bone transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.25"
                }`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink/95 backdrop-blur-2xl lg:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.07,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-4xl font-light text-bone transition-colors hover:text-gold-300"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 border border-gold-500 px-8 py-3 text-[11px] uppercase tracking-[0.3em] text-gold-300"
            >
              Private Viewing
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
