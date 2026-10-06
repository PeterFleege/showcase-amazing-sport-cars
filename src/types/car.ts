// src/types/car.ts

// Definition of data used in app
export interface Car {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  year: number;
  image: string;
  accentFrom: string;
  accentTo: string;
  powerHp: number;
  topSpeedKmh: number;
  zeroTo100: number;
  engine: string;
  featured: boolean;
  sortOrder: number;
}

// For interpreting the data coming from db
export interface CarRow {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  year: number;
  image: string;
  accent_from: string;
  accent_to: string;
  power_hp: number;
  top_speed_kmh: number;
  zero_to_100: string;
  engine: string;
  featured: boolean;
  sort_order: number;
}
