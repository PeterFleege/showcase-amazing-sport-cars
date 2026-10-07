// src/components/content-sections/Heritage.tsx

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CarImage from "../ui/CarImage";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import HERITAGE from "@/lib/constants/heritage";

export default function Heritage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="heritage" className="relative bg-ink py-28 lg:py-40">
      <div className="mx-auto grid max-w-350 gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-12">
        {/* Sticky portrait image */}
        <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-10rem)]">
          <div className="relative aspect-4/5 overflow-hidden lg:h-full lg:aspect-auto">
            <CarImage
              src="/images/heritage.jpg"
              alt="The Aurum workshop"
              accentFrom="#4a3410"
              accentTo="#0a0a0a"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
            <span className="absolute inset-5 border border-gold-400/30" />
            <p className="absolute bottom-10 left-10 font-display text-3xl italic text-bone/90">
              “Perfection is a habit.”
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Our Heritage"
            title={
              <>
                Four decades of{" "}
                <span className="italic text-gold-gradient">
                  quiet rebellion.
                </span>
              </>
            }
            subtitle="From a three-person workshop to one of the most coveted names in performance — without ever leaving the craft behind."
          />

          <div ref={ref} className="relative mt-16 pl-10">
            <div className="absolute bottom-0 left-0 top-0 w-px bg-bone/10" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-0 top-0 w-px bg-linear-to-b from-gold-300 to-gold-600"
            />

            <ul className="space-y-16">
              {HERITAGE.map((m) => (
                <Reveal key={m.year}>
                  <li className="relative">
                    <span className="absolute -left-11.25 top-3 h-2.5 w-2.5 rotate-45 bg-gold-400 shadow-[0_0_18px_rgba(228,185,95,0.7)]" />
                    <p className="font-display text-5xl font-light text-gold-gradient">
                      {m.year}
                    </p>
                    <h3 className="mt-2 text-sm uppercase tracking-[0.3em] text-bone">
                      {m.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/65">
                      {m.text}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
