// src/components/ui/SectionHeading.tsx

import Reveal from "./Reveal";
import SectionHeadingProps from "@/types/section-heading";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-5 ${alignment}`}>
      <Reveal>
        <span className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.42em] text-gold-500">
          <span className="h-px w-10 bg-gold-600" />
          {eyebrow}
          {align === "center" && <span className="h-px w-10 bg-gold-600" />}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="max-w-xl text-[15px] leading-relaxed text-mist">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
