// src/components/content-sections/Collection.tsx

"use client";

import { motion } from "framer-motion";
import type { Car } from "@/types/car";
import CarImage from "../ui/CarImage";
import SectionHeading from "../ui/SectionHeading";

function CarCard({ car, index }: { car: Car; index: number }) {
  // Vertical grid on large screens
  const offset = index % 2 === 1 ? "lg:mt-24" : "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1,
        delay: (index % 2) * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative ${offset}`}
    >
      <a
        href="#contact"
        className="block"
        aria-label={`Enquire about the ${car.name}`}
      >
        <div className="relative aspect-4/5 overflow-hidden bg-graphite sm:aspect-5/6">
          {/* Image with slow zoom on hover */}
          <div className="absolute inset-0 transition-transform duration-1400 ease-out group-hover:scale-110">
            <CarImage
              src={car.image}
              alt={car.name}
              accentFrom={car.accentFrom}
              accentTo={car.accentTo}
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />

          {/* Gold frame on hover */}
          <span className="pointer-events-none absolute inset-4 border border-gold-400/0 transition-all duration-700 group-hover:inset-6 group-hover:border-gold-400/60" />

          <span className="absolute left-6 top-6 text-[10px] font-medium uppercase tracking-[0.4em] text-gold-300/90">
            {String(index + 1).padStart(2, "0")} / {car.year}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
            <h3 className="font-display text-4xl font-light sm:text-5xl">
              {car.name}
            </h3>
            <p className="mt-2 font-display text-xl italic text-gold-300">
              {car.tagline}
            </p>

            {/* Description + specs slide up on hover */}
            <div className="grid grid-rows-[0fr] transition-all duration-700 ease-out group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/75">
                  {car.description}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gold-500/25 pt-5">
              <Spec label="Power" value={`${car.powerHp}`} unit="hp" />
              <Spec label="0–100" value={car.zeroTo100.toFixed(1)} unit="s" />
              <Spec
                label="Top speed"
                value={`${car.topSpeedKmh}`}
                unit="km/h"
              />
            </div>

            <span className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold-300">
              Enquire
              <span className="h-px w-8 bg-gold-400 transition-all duration-500 group-hover:w-16" />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

function Spec({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.3em] text-mist">{label}</p>
      <p className="mt-1 font-display text-2xl text-bone">
        {value} <span className="text-xs text-gold-500">{unit}</span>
      </p>
    </div>
  );
}

export default function Collection({ cars }: { cars: Car[] }) {
  return (
    <section id="collection" className="relative bg-ink py-28 lg:py-40">
      <div className="mx-auto max-w-350 px-6 lg:px-12">
        <SectionHeading
          eyebrow="The Collection"
          title={
            <>
              Four icons.{" "}
              <span className="italic text-gold-gradient">One obsession.</span>
            </>
          }
          subtitle="Each model is produced in strictly limited numbers and finished to the specification of its owner."
        />

        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-0">
          {cars.map((car, i) => (
            <CarCard key={car.slug} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
