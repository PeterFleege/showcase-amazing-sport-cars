// src/lib/queries/cars.ts

import { getSql } from "@/db/db";
import { CARS } from "@/db/data/cars-data";
import type { Car, CarRow } from "@/types/car";

// Fetch cars from PostgreSQL -> fallback static data (cars-data)

function rowToCar(r: CarRow): Car {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    tagline: r.tagline,
    description: r.description,
    year: r.year,
    image: r.image,
    accentFrom: r.accent_from,
    accentTo: r.accent_to,
    powerHp: r.power_hp,
    topSpeedKmh: r.top_speed_kmh,
    zeroTo100: Number(r.zero_to_100),
    engine: r.engine,
    featured: r.featured,
    sortOrder: r.sort_order,
  };
}

export async function getFeaturedCars(): Promise<Car[]> {
  const sql = getSql();
  if (!sql) return CARS;

  try {
    // The query returns the rows directly (pg wrapped them in { rows }).
    const rows = await sql<CarRow[]>`
      SELECT * FROM cars WHERE featured = TRUE ORDER BY sort_order ASC
    `;
    return rows.length > 0 ? rows.map(rowToCar) : CARS;
  } catch (err) {
    console.warn(
      "[db] Could not load cars from PostgreSQL, using static fallback:",
      (err as Error).message,
    );
    return CARS;
  }
}
