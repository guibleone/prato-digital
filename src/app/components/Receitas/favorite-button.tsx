'use client'
import { Button } from "@/components/ui/button";
import { addToFavorites, removeFromFavorites } from "@/lib/recipeActions"
import { cn } from "@/lib/utils";
import { Heart, HeartOff } from "lucide-react";
import { useState } from "react"
import { useFormStatus } from "react-dom";
import { TailSpin } from "react-loader-spinner"

function Submit({
    isFavorite,
}: {
    isFavorite: boolean;
}) {
    const { pending } = useFormStatus();
    return (
        <Button
            className="w-full"
            variant={isFavorite ? 'destructive' : 'default'}
            type="submit" disabled={pending}>
            {isFavorite ? <HeartOff /> : <Heart />}
        </Button>
    );
}

export const FavoriteButton = ({ recipeId, isFavorite }: { recipeId: string, isFavorite: boolean }) => {

    const [isLoading, setIsLoading] = useState(false)

    const addFavorite = async () => {
        setIsLoading(true)
        await addToFavorites(recipeId)
        setIsLoading(false)
    }

    const removeFavorite = async () => {
        setIsLoading(true)
        await removeFromFavorites(recipeId)
        setIsLoading(false)
    }
    

    if (isFavorite) {
        return (
            <form action={removeFavorite}>
                <Submit isFavorite={isFavorite} />
            </form>
        )
    } else {
        return (
            <form action={addFavorite}>
                <Submit isFavorite={isFavorite} />
            </form>
        )
    }

}