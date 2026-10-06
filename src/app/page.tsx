// import Image from "next/image";

import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/content-sections/Hero";
import { getFeaturedCars } from "@/lib/queries/cars";

export default async function Home() {
  const cars = await getFeaturedCars();
  return (
    <div className="flex flex-col flex-1 font-sans items-center justify-center bg-zinc-50 dark:bg-black">
      <Navbar />
      <Hero cars={cars} />
    </div>
  );
}
