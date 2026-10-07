// src/app/page.tsx

import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/content-sections/Hero";
import Collection from "@/components/content-sections/Collection";
import Experience from "@/components/content-sections/Experience";
import Performance from "@/components/content-sections/Performance";
import Heritage from "@/components/content-sections/Heritage";
import Gallery from "@/components/content-sections/Gallery";
import Intro from "@/components/content-sections/Intro";
import Contact from "@/components/content-sections/Contact";
import { getFeaturedCars } from "@/lib/queries/cars";

export default async function Home() {
  const cars = await getFeaturedCars();
  return (
    <>
      <Navbar />
      <Hero cars={cars} />
      <Intro />
      <Collection cars={cars} />
      <Experience car={cars[0]} />
      <Performance cars={cars} />
      <Heritage />
      <Gallery cars={cars} />
      <Contact cars={cars} />
    </>
  );
}
