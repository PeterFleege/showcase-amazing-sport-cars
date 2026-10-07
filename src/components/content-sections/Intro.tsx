// src/components/content-sections/Intro.tsx

import Reveal from "../ui/Reveal";
import WORDS from "@/lib/constants/intro-words";

export default function Intro() {
  const track = [...WORDS, ...WORDS];

  return (
    <section className="relative overflow-hidden border-y border-gold-500/10 bg-coal">
      {/* Marquee */}
      <div
        className="overflow-hidden border-b border-gold-500/10 py-5"
        aria-hidden
      >
        <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap">
          {track.map((w, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="font-display text-2xl italic text-bone/50">
                {w}
              </span>
              <span className="text-gold-500">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-28 text-center lg:py-40">
        <Reveal>
          <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.45em] text-gold-500">
            Since 1987
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-display text-3xl font-light leading-snug sm:text-4xl lg:text-6xl lg:leading-[1.15]">
            We don&apos;t build cars for everyone. We build them for the few who
            feel{" "}
            <em className="text-gold-gradient not-italic">the difference</em>{" "}
            between fast and unforgettable.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="hairline mx-auto mt-14 w-40" />
        </Reveal>
      </div>
    </section>
  );
}
