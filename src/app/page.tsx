import Image from "next/image";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Features from "./components/HomePage/Features";
import Hero from "./components/HomePage/Hero";

export default function Home() {
  return (
    <main>

      {/* Hero */}
      <section>
        <Hero />
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-20">
        <Features />
      </section>



    </main>
  )
}
