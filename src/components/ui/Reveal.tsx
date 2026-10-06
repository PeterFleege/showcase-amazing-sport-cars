// src/components/ui/Reveal.tsx

"use client";

import { motion } from "framer-motion";
import RevealProps from "@/types/reveal-props";

// Fades/lifts content into view once as it scrolls into viewport
export default function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
