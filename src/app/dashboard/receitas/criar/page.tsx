import CreateRecipe from '@/app/components/CriarPage/createRecipe'
import MaxWidthWrapper from '@/app/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function CriarPage() {
    return (
        <main>
            <section className='py-20'>
                <MaxWidthWrapper>
                    <h1 className='font-bold text-2xl sm:text-4xl mb-6'>
                        Nova Receita
                    </h1>
                    <CreateRecipe />
                </MaxWidthWrapper>
            </section>
        </main>
    )
}
