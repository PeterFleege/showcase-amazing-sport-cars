// src/db/setup.ts

/* Setup file that creates cars table in database and populates it */

import "dotenv/config";
import { join } from "node:path";
import postgres from "postgres";
import { CARS } from "@/db/data/cars-data";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env first.",
    );
  }

  const sql = postgres(url, {
    max: 1,
    connect_timeout: 5,
    onnotice: (notice) => console.log(`  · ${notice.message}`),
  });

  try {
    await sql.file(join(__dirname + "schemas", "schema.sql"));
    console.log("New schema has been deployed");

    for (const c of CARS) {
      await sql`
        INSERT INTO cars
          (slug, name, tagline, description, year, image, accent_from, accent_to,
           power_hp, top_speed_kmh, zero_to_100, engine, featured, sort_order)
        VALUES (
          ${c.slug}, ${c.name}, ${c.tagline}, ${c.description}, ${c.year}, ${c.image},
          ${c.accentFrom}, ${c.accentTo}, ${c.powerHp}, ${c.topSpeedKmh}, ${c.zeroTo100},
          ${c.engine}, ${c.featured}, ${c.sortOrder}
        )
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          tagline = EXCLUDED.tagline,
          description = EXCLUDED.description,
          year = EXCLUDED.year,
          image = EXCLUDED.image,
          accent_from = EXCLUDED.accent_from,
          accent_to = EXCLUDED.accent_to,
          power_hp = EXCLUDED.power_hp,
          top_speed_kmh = EXCLUDED.top_speed_kmh,
          zero_to_100 = EXCLUDED.zero_to_100,
          engine = EXCLUDED.engine,
          featured = EXCLUDED.featured,
          sort_order = EXCLUDED.sort_order
      `;
    }
    console.log(`${CARS.length} cars inserted`);
  } finally {
    await sql.end();
  }
}

main().catch((err) => {
  console.error("Database setup failed:", err.message);
  process.exit(1);
});
