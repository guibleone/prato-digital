import { fetchFilteredRecipes } from '@/lib/data'
import React from 'react'
import CardRecipe from '../CardRecipe'


export default async function Recipes({
    query,
    currentPage,
}: {
    query: string
    currentPage: number
}) {

    const recipes = await fetchFilteredRecipes(query, currentPage)

    return (

        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {recipes?.map((recipe) => (
                <CardRecipe key={recipe.id} recipe={recipe} />
            ))}
        </div>

    )
}