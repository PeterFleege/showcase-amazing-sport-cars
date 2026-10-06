// import Image from "next/image";

import Navbar from "@/components/navigation/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 font-sans items-center justify-center bg-zinc-50 dark:bg-black">
      <Navbar />
    </div>
  );
}
