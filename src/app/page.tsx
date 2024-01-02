import Features from "./components/HomePage/Features";
import Hero from "./components/HomePage/Hero";
import TopRecipes from "./components/HomePage/TopRecipes";


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

      {/* Top Recipes */}
      <TopRecipes />

    </main>
  )
}
