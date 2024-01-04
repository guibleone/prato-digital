import { fetchTopRecipes } from "@/lib/data";
import Features from "./components/HomePage/Features";
import Hero from "./components/HomePage/Hero";
import TopRecipes from "./components/HomePage/TopRecipes";
import MaxWidthWrapper from "./components/MaxWidthWrapper";


export default async function Home() {
  const recipes = await fetchTopRecipes();

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
      {/*@ts-ignore */}
      <TopRecipes recipes={recipes} />

      <section className="bg-gray-900 py-20">
        <MaxWidthWrapper>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-20 text-center items-center">
            <h1 className="text-gray-50 text-2xl sm:text-4xl flex-2">
              Compartilhe suas <span className="bg-gray-50 text-gray-900 font-bold px-3.5">receitas</span> com o mundo
            </h1>
            <button className="border flex-1 w-full border-grytext-gray-50 text-gray-50 px-4 py-4 hover:bg-gray-50 hover:text-gray-900  transition-all delay-75 ">
              <span className="font-bold">Cozinhar agora</span>
            </button>
          </div>
        </MaxWidthWrapper>
      </section>

    </main>
  )
}
