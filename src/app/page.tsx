// src/app/page.tsx

import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/content-sections/Hero";
import Collection from "@/components/content-sections/Collection";
import Experience from "@/components/content-sections/Experience";
import Performance from "@/components/content-sections/Performance";
import { getFeaturedCars } from "@/lib/queries/cars";

export default async function Home() {
  const cars = await getFeaturedCars();
  return (
    <>
      <Navbar />
      <Hero cars={cars} />
      <Collection cars={cars} />
      <Experience car={cars[0]} />
      <Performance cars={cars} />
    </>
  );
}
