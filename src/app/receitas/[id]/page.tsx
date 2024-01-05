import MaxWidthWrapper from '@/app/components/MaxWidthWrapper'
import ReviewCard from '@/app/components/Receitas/review-card'
import ReviewForm from '@/app/components/Receitas/review-form'
import { fetchRecipeById, fetchRecipeLatestReviews } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export default async function SingleRecipe({ params }: { params: { id: string } }) {
    const id = params.id

    const recipe = await fetchRecipeById(id)
    const reviews = await fetchRecipeLatestReviews(id)

    return (
        <section className='py-10 sm:py-20'>
            <MaxWidthWrapper className="max-w-screen-lg">
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold text-center'>{recipe?.title}</h1>
                </div>
                <div className='flex justify-center'>
                    <Image className='rounded-lg shadow-xl' src={recipe?.image!} width={500} height={200} alt={recipe?.title!} />
                </div>
                <div className='mt-8'>
                    <h2 className='text-xl font-bold'>Descrição</h2>
                    <p>{recipe?.description}</p>
                </div>
                <div className='mt-8'>
                    <h2 className='text-xl font-bold'>Ingredientes</h2>
                    <ul className='list-disc list-inside'>
                        {recipe?.ingredients.map((ingredient) => (
                            <li key={ingredient}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className='mt-8'>
                    <h2 className='text-xl font-bold'>Instruções</h2>
                    <p>{recipe?.instructions}</p>
                </div>

                <div className='flex relative flex-col sm:flex-row items-start sm:items-center justify-between   mt-8 gap-2 bg-gray-100 py-5 px-8'>
                    <div className='flex gap-3'>
                        <div>
                            <Image className='rounded-full' src={recipe?.author.image!} width={50} height={50} alt={recipe?.author?.name!} />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-sm font-normal text-muted-foreground'>Escrito por</p>
                            <p className='text-sm sm:text-lg font-bold text-muted-foreground'>{recipe?.author?.name!}</p>
                        </div>
                    </div>
                    <div className='absolute bottom-0 right-0 px-2 sm:px-4 sm:py-4 py-2'>
                        <p className='text-sm font-bold text-muted-foreground'>{formatDate(recipe?.createdAt!)}</p>
                    </div>
                </div>

                <div className='mt-8'>
                    <h2 className='text-xl font-bold mb-3'>Deixe sua avaliação</h2>
                    <ReviewForm recipeId={recipe?.id!} />
                </div>

                <div className='mt-8'>
                    <h2 className='text-xl font-bold'>Avaliações</h2>

                    {reviews?.length === 0 && (
                            <p className='text-muted-foreground mt-2'>
                                Ainda não há avaliações para esta receita
                            </p>
                        )}

                    <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-5'>
                        {reviews?.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                </div>
            </MaxWidthWrapper>

        </section>
    )
}
