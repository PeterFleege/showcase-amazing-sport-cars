// src/components/content-sections/Performance.tsx

"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import type { Car } from "@/types/car";
import SectionHeading from "../ui/SectionHeading";

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) =>
    decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US"),
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration: 2.4,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, value]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

export default function Performance({ cars }: { cars: Car[] }) {
  const maxPower = Math.max(...cars.map((c) => c.powerHp));
  const maxSpeed = Math.max(...cars.map((c) => c.topSpeedKmh));
  const quickest = Math.min(...cars.map((c) => c.zeroTo100));

  const stats = [
    { label: "Peak output", value: maxPower, unit: "hp", decimals: 0 },
    { label: "Top speed", value: maxSpeed, unit: "km/h", decimals: 0 },
    { label: "0–100 km/h", value: quickest, unit: "sec", decimals: 1 },
    { label: "Cars built per year", value: 250, unit: "max", decimals: 0 },
  ];

  return (
    <section id="performance" className="relative bg-coal py-28 lg:py-40">
      <div className="mx-auto max-w-350 px-6 lg:px-12">
        <SectionHeading
          eyebrow="Performance"
          title={
            <>
              Numbers that{" "}
              <span className="italic text-gold-gradient">earn</span> the name.
            </>
          }
        />

        <div className="mt-20 grid gap-px bg-gold-500/15 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative bg-coal px-8 py-14 text-center transition-colors duration-700 hover:bg-graphite"
            >
              <p className="font-display text-6xl font-light text-gold-gradient lg:text-7xl">
                <Counter to={s.value} decimals={s.decimals} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.35em] text-gold-500">
                {s.unit}
              </p>
              <div className="hairline mx-auto my-6 w-12 transition-all duration-700 group-hover:w-24" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-mist">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Power comparison bars */}
        <div className="mx-auto mt-24 max-w-3xl space-y-7">
          {cars.map((c, i) => (
            <div key={c.slug}>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-display text-xl">{c.name}</span>
                <span className="text-xs tracking-[0.2em] text-gold-400">
                  {c.powerHp} HP
                </span>
              </div>
              <div className="h-px w-full bg-bone/10">
                <motion.div
                  className="h-px bg-linear-to-r from-gold-700 to-gold-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(c.powerHp / maxPower) * 100}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 1.6,
                    delay: i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
