// src/components/ui/CarImage.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import CarImageProps from "@/types/car-image";

export default function CarImage({
  src,
  alt,
  accentFrom,
  accentTo,
  priority,
  sizes = "100vw",
  className = "",
  imageClassName = "",
}: CarImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 70% 30%, ${accentFrom} 0%, ${accentTo} 70%)`,
      }}
    >
      {/* Placeholder silhouette (visible only while no photo is present - i.e. failed = true) */}
      <svg
        aria-hidden
        viewBox="0 0 800 260"
        className="absolute bottom-[12%] left-1/2 w-[78%] -translate-x-1/2 opacity-[0.16]"
        fill="#e4b95f"
      >
        <path d="M30 190c0-22 14-34 42-40l112-26c38-26 84-46 140-52 70-8 132 4 178 30l98 20c44 8 82 22 112 44 20 16 28 30 28 46v14c0 8-6 14-14 14h-44a62 62 0 0 0-124 0H310a62 62 0 0 0-124 0H44c-8 0-14-6-14-14Zm156 24a38 38 0 1 0 76 0 38 38 0 0 0-76 0Zm440 0a38 38 0 1 0 76 0 38 38 0 0 0-76 0Z" />
      </svg>

      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onError={() => setFailed(true)}
          className={`object-cover ${imageClassName}`}
        />
      )}
    </div>
  );
}
