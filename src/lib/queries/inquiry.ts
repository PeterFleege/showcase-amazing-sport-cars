// src/lib/queries/inquiry.ts

import { getSql } from "@/db/db";
import { InquiryInput } from "@/types/inquiry-input";

/* Configure database for this to work without error */
export async function saveInquiry(input: InquiryInput): Promise<void> {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured");

  await sql`
    INSERT INTO inquiries (name, email, car_slug, message)
    VALUES (${input.name}, ${input.email}, ${input.carSlug ?? null}, ${input.message ?? null})
  `;
}
