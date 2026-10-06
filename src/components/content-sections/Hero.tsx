// src/components/content-sections/Hero.tsx

"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { Car } from "@/types/car";
import CarImage from "../ui/CarImage";

const AUTOPLAY_MS = 8000;

export default function Hero({ cars }: { cars: Car[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const car = cars[index];

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + cars.length) % cars.length),
    [cars.length],
  );

  // Autoplay (restarts whenever the slide changes, pauses on hover)
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) go(1);
    else if (info.offset.x > 80) go(-1);
  };

  return (
    <section
      id="top"
      className="film-grain relative h-svh min-h-160 w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured super cars"
    >
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={car.slug}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={onDragEnd}
        >
          <div className="animate-kenburns absolute inset-0">
            <CarImage
              src={car.image}
              alt={`${car.name} — ${car.tagline}`}
              accentFrom={car.accentFrom}
              accentTo={car.accentTo}
              priority={index === 0}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Readability overlays */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-ink/70" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-ink/90 via-ink/30 to-transparent" />

      {/* Copy */}
      <div className="relative z-10 mx-auto flex h-full max-w-375 flex-col justify-end px-6 pb-28 lg:px-12 lg:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={car.slug}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="mb-6 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.45em] text-gold-400">
              <span className="h-px w-12 bg-gold-500" />
              {car.year} · {car.engine}
            </p>
            <h1 className="font-display text-6xl font-light leading-[0.95] sm:text-7xl lg:text-[8.5rem]">
              <span className="text-gold-gradient">{car.name}</span>
            </h1>
            <p className="mt-6 font-display text-2xl italic text-bone/90 sm:text-3xl">
              {car.tagline}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#collection"
                className="group relative overflow-hidden bg-gold-500 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink transition-transform duration-500 hover:-translate-y-0.5"
              >
                <span className="relative z-10">Discover the Collection</span>
                <span className="absolute inset-0 -translate-x-full bg-gold-300 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a
                href="#contact"
                className="border-b border-gold-500/60 pb-1 text-[11px] uppercase tracking-[0.3em] text-bone transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                Book a Private Viewing
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider controls */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-375 items-center gap-6 px-6 pb-8 lg:px-12">
          <span className="font-display text-xl tabular-nums text-gold-400">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div
            className="flex flex-1 items-center gap-3"
            role="tablist"
            aria-label="Choose slide"
          >
            {cars.map((c, i) => (
              <button
                key={c.slug}
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${c.name}`}
                onClick={() => setIndex(i)}
                className="group relative h-6 flex-1 max-w-35"
              >
                <span className="absolute inset-x-0 top-1/2 h-px bg-bone/25" />
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute left-0 top-1/2 h-px bg-gold-400"
                    initial={{ width: paused ? "100%" : 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: paused ? 0 : AUTOPLAY_MS / 1000,
                      ease: "linear",
                    }}
                  />
                )}
                <span className="absolute inset-x-0 -top-1 text-left text-[10px] uppercase tracking-[0.25em] text-bone/0 transition-colors group-hover:text-bone/70">
                  {c.name}
                </span>
              </button>
            ))}
          </div>

          <span className="font-display text-xl tabular-nums text-bone/40">
            {String(cars.length).padStart(2, "0")}
          </span>

          <div className="hidden gap-3 sm:flex">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => go(dir)}
                aria-label={dir === 1 ? "Next slide" : "Previous slide"}
                className="grid h-12 w-12 place-items-center rounded-full border border-bone/25 text-bone transition-all duration-500 hover:border-gold-400 hover:bg-gold-500 hover:text-ink"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path
                    d={
                      dir === 1 ? "M3 8h10M9 4l4 4-4 4" : "M13 8H3M7 4L3 8l4 4"
                    }
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-28 right-8 z-10 hidden flex-col items-center gap-3 lg:flex">
        <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.4em] text-bone/50">
          Scroll
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-bone/20">
          <span className="animate-scroll-cue absolute inset-0 bg-gold-400" />
        </span>
      </div>
    </section>
  );
}
