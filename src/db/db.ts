// src/db/db.ts

import postgres from "postgres";
import { InquiryInput } from "@/types/inquiry-input";

declare global {
  var __sql: postgres.Sql | undefined;
}

export function getSql(): postgres.Sql | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;

  if (!globalThis.__sql) {
    globalThis.__sql = postgres(url, {
      max: 8,
      idle_timeout: 30,
      connect_timeout: 2,

      onnotice: (n) => console.warn(`[db] ${n.severity}: ${n.message}`),
    });
  }
  return globalThis.__sql;
}

/* Configure database for this to work without error */
export async function saveInquiry(input: InquiryInput): Promise<void> {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured");

  await sql`
    INSERT INTO inquiries (name, email, car_slug, message)
    VALUES (${input.name}, ${input.email}, ${input.carSlug ?? null}, ${input.message ?? null})
  `;
}
