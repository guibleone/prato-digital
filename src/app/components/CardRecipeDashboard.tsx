import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Recipe = {
    id: string;
    title: string;
    description: string;
    isPublished: boolean;
    image: string;
    ingredients: string[];
    instructions: string[];
    createdAt: string;
    updatedAt: string;
};

export default function CardRecipeDashboard({ recipe }: { recipe: Recipe }) {
    return (
        <div
            className="bg-white rounded-lg shadow-xl hover:cursor-pointer hover:shadow-2xl transition-all duration-300"
        >   <Link href={`/dashboard/receitas/${recipe.id}`}>
                <div className="px-4 py-2">
                    <div className="flex flex-col items-center sm:items-start mt-2 gap-1">
                        <h3 className="text-xl font-bold">
                            {recipe.title.length > 25 ? recipe.title.slice(0, 25) + '...' : recipe.title}
                        </h3>
                        <span className="text-sm text-muted-foreground font-bold ">
                            {recipe.isPublished ? 'Publicado' : 'Rascunho'}
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                        {recipe.description.length > 100 ? recipe.description.slice(0, 100) + '...' : recipe.description}
                    </p>
                    <div className="flex gap-2 justify-end mt-6 py-2">
                        <Edit size={25} />
                    </div>
                </div>
            </Link>
        </div>

    )
}
