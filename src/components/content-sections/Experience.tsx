// src/components/content-sections/Experience.tsx

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Car } from "@/types/car";
import CarImage from "../ui/CarImage";
import Reveal from "../ui/Reveal";
import EXPERIENCE from "@/lib/constants/experience";

export default function Experience({ car }: { car: Car }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image scrolls slower than the page, while inner copy scrolls a bit faster giving it a 3D effect
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.15, 1.05, 1.15],
  );
  const copyY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="experience"
      ref={ref}
      className="film-grain relative isolate flex min-h-[110vh] items-center overflow-hidden"
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-[-12%] -z-10"
      >
        <CarImage
          src="/images/experience.jpg"
          alt="Detail of a hand-finished super car"
          accentFrom={car.accentFrom}
          accentTo="#050505"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink via-transparent to-ink" />

      <motion.div
        style={{ y: copyY }}
        className="mx-auto w-full max-w-350 px-6 py-32 lg:px-12"
      >
        <div className="max-w-xl">
          <Reveal>
            <span className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.42em] text-gold-500">
              <span className="h-px w-10 bg-gold-600" />
              The Experience
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-5xl font-light leading-[1.05] lg:text-7xl">
              Craft you can{" "}
              <span className="italic text-gold-gradient">feel</span> before you
              drive.
            </h2>
          </Reveal>

          <ul className="mt-14 space-y-8">
            {EXPERIENCE.map((p, i) => (
              <Reveal key={p.title} delay={0.1 * i}>
                <li className="group flex gap-6 border-l border-gold-500/30 pl-6 transition-colors duration-500 hover:border-gold-300">
                  <span className="font-display text-2xl text-gold-500">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-bone transition-colors group-hover:text-gold-300">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-bone/65">
                      {p.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
