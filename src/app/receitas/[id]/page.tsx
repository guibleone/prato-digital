import MaxWidthWrapper from '@/app/components/MaxWidthWrapper'
import { fetchRecipeById } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export default async function SingleRecipe({ params }: { params: { id: string } }) {
    const id = params.id
    const recipe = await fetchRecipeById(id)

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

                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between   mt-8 gap-2 bg-gray-100 py-5 px-8'>
                    <div className='flex gap-3'>
                        <Image className='rounded-full' src={recipe?.author.image!} width={50} height={50} alt={recipe?.author?.name!} />
                        <div className='flex flex-col'>
                            <p className='text-sm font-normal text-muted-foreground'>Escrito por</p>
                            <p className='text-lg font-bold text-muted-foreground'>{recipe?.author?.name!}</p>
                        </div>
                    </div>

                    <p className='text-lg self-center  text-muted-foreground'>{formatDate(recipe?.createdAt!)}</p>
                </div>

            </MaxWidthWrapper>

        </section>
    )
}
