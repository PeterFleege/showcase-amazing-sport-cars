// src/components/content-sections/Gallery.tsx

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { Car } from "@/types/car";
import CarImage from "../ui/CarImage";
import SectionHeading from "../ui/SectionHeading";

// Creates asymmetric grid spans
const SPANS = ["lg:col-span-2 lg:row-span-2", "", "", "lg:col-span-2", ""];

export default function Gallery({ cars }: { cars: Car[] }) {
  const [active, setActive] = useState<number | null>(null);

  // Builds gallery tiles from the cars, plus extra detail shots
  const tiles = [
    ...cars.map((c) => ({
      key: c.slug,
      src: c.image,
      label: c.name,
      from: c.accentFrom,
      to: c.accentTo,
    })),
    {
      key: "mysterious",
      src: "/images/gallery/mysterious.jpg",
      label: "Mysterious",
      from: "#4a3410",
      to: "#090909",
    },
    {
      key: "eye-catching",
      src: "/images/gallery/eye-catching.jpg",
      label: "Eye Catching",
      from: "#4a3410",
      to: "#090909",
    },
    {
      key: "interior",
      src: "/images/gallery/interior.jpg",
      label: "The Interior",
      from: "#4a3410",
      to: "#090909",
    },
    {
      key: "top-view",
      src: "/images/gallery/top-view.jpg",
      label: "Top View",
      from: "#4a3410",
      to: "#090909",
    },
  ];

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((a) =>
        a === null ? a : (a + dir + tiles.length) % tiles.length,
      ),
    [tiles.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <section id="gallery" className="bg-coal py-28 lg:py-40">
      <div className="mx-auto max-w-375 px-6 lg:px-12">
        <SectionHeading
          eyebrow="Gallery"
          title={
            <>
              Light, <span className="italic text-gold-gradient">shape</span>{" "}
              &amp; shadow.
            </>
          }
        />

        <div className="mt-20 grid auto-rows-65 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-75">
          {tiles.map((t, i) => (
            <motion.button
              key={t.key}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                delay: (i % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative overflow-hidden text-left ${SPANS[i] ?? ""}`}
              aria-label={`Open ${t.label}`}
            >
              <div className="absolute inset-0 transition-transform duration-1200 ease-out group-hover:scale-110">
                <CarImage
                  src={t.src}
                  alt={t.label}
                  accentFrom={t.from}
                  accentTo={t.to}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-ink/40 transition-colors duration-700 group-hover:bg-ink/10" />
              <span className="absolute inset-3 border border-gold-400/0 transition-all duration-700 group-hover:border-gold-400/50" />
              <span className="absolute bottom-5 left-5 translate-y-3 font-display text-2xl opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                {t.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={tiles[active].label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-70 bg-ink/95 backdrop-blur-xl"
            onClick={close}
          >
            <motion.div
              key={tiles[active].key}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-6 sm:inset-14"
              onClick={(e) => e.stopPropagation()}
            >
              <CarImage
                src={tiles[active].src}
                alt={tiles[active].label}
                accentFrom={tiles[active].from}
                accentTo={tiles[active].to}
                imageClassName="!object-contain"
              />
            </motion.div>

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-2xl text-gold-300">
              {tiles[active].label}
            </p>

            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-bone/30 text-xl hover:border-gold-400 hover:text-gold-300"
            >
              ×
            </button>
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={(e) => {
                  e.stopPropagation();
                  step(d);
                }}
                aria-label={d === 1 ? "Next image" : "Previous image"}
                className={`absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-bone/30 hover:border-gold-400 hover:text-gold-300 ${d === 1 ? "right-6" : "left-6"}`}
              >
                {d === 1 ? "→" : "←"}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
