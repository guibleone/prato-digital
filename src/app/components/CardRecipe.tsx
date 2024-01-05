
import { Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import CardReviews from "./Receitas/card-reviwes";

export default function CardRecipe({ recipe }: { recipe: Recipe }) {
  return (
    <div
      className="bg-white rounded-lg shadow-xl hover:cursor-pointer hover:shadow-2xl transition-all duration-300"
    >
      <Link href={`/receitas/${recipe.id}`}>
        <Image className="aspect-video object-cover" src={recipe?.image!} width={400} height={200} alt="receita" />
        <div className="px-4 py-2">
          <h3 className="text-xl font-bold mt-2">
            {recipe.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            {recipe?.description?.length! > 100 ? recipe.description?.slice(0, 100) + '...' : recipe.description}
          </p>
          <div className="flex gap-4 mt-4">
            <div className="flex gap-2 items-center">
              <CardReviews recipeId={recipe.id} />
            </div>
          </div>
        </div>
      </Link>
    </div>

  )
}
