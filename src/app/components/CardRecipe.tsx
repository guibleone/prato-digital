import { Recipe } from "@prisma/client";
import Image from "next/image";

export default function CardRecipe({ recipe }: { recipe: Recipe }) {
  return (
    <div
      className="bg-white rounded-lg shadow-xl hover:cursor-pointer hover:shadow-2xl transition-all duration-300"
    >
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
            <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2l3.09 6.89L22 9.3l-5 4.87 1.18 6.88L12 17.77l-6.18 3.28L7 14.17l-5-4.87 6.91-.41L12 2z" />
            </svg>
            <span className="text-sm text-muted-foreground">
              <span className="font-bold">4.8</span> (200 avaliações)
            </span>
          </div>
        </div>
      </div>
    </div>

  )
}
