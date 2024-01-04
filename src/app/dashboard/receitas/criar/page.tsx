import CreateRecipe from '@/app/components/CriarPage/createRecipe'
import MaxWidthWrapper from '@/app/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CriarPage() {
    return (
        <main>
            <section className='py-10 sm:py-20'>
                <MaxWidthWrapper>
                    <div className='flex justify-between gap-1 mb-6'>
                        <h1 className='font-bold text-2xl sm:text-4xl '>
                            Nova Receita
                        </h1>
                        <Button asChild>
                            <Link href='/dashboard'>
                                <ArrowLeft size={25} />
                            </Link>
                        </Button>
                    </div>
                    <CreateRecipe />
                </MaxWidthWrapper>
            </section>
        </main>
    )
}
