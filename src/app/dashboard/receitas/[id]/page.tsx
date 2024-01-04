import EditForm from '@/app/components/EditForm'
import MaxWidthWrapper from '@/app/components/MaxWidthWrapper'
import { fetchRecipeById } from '@/lib/data';
import Link from 'next/link';
import React from 'react'

export default async function EditPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const recipe = await fetchRecipeById(id);


    return (
        <main>
            <section className='py-20'>
                <MaxWidthWrapper>
                    <div className='flex flex-col gap-1 mb-6'>
                        <h1 className='text-4xl font-bold text-gray-900'>Editar receita</h1>
                        <Link href='/dashboard'>
                            <p className='underline text-muted-foreground'>
                                Voltar
                            </p>
                        </Link>
                    </div>
                    <EditForm recipe={recipe} />
                </MaxWidthWrapper>
            </section>
        </main>
    )
}
