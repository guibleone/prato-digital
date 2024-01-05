import { fetchFilteredRecipes } from '@/lib/data'
import React from 'react'
import CardRecipe from '../CardRecipe'


export default async function Recipes({
    query,
    currentPage,
    isFavorite
}: {
    query: string
    currentPage: number
    isFavorite?: boolean
}) {

    const recipes = await fetchFilteredRecipes(query, currentPage, isFavorite)

    return (
        <>
            {recipes?.length === 0 && (
                <div className='text-center sm:text-start text-lg text-gray-500'>
                    {isFavorite ? 'Você não tem receitas favoritas' : 'Nenhuma receita encontrada'}
                </div>
            )}
            <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

                {recipes?.map((recipe) => (
                    <CardRecipe key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </>

    )
}