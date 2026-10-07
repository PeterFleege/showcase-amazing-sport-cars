// src/db/db.ts

import postgres from "postgres";

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
