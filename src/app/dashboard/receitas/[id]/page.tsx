import { DeleteButton } from '@/app/components/Dasboard/action-buttons';
import EditForm from '@/app/components/EditForm'
import MaxWidthWrapper from '@/app/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button';
import { fetchRecipeById } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function EditPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const recipe = await fetchRecipeById(id);


    return (
        <main>
            <section className='py-10 sm:py-20'>
                <MaxWidthWrapper>
                    <div className='flex justify-between gap-1 mb-6'>
                        <h1 className='font-bold text-2xl sm:text-4xl '>
                            Editar Receita
                        </h1>
                        <Button asChild>
                            <Link href='/dashboard'>
                                <ArrowLeft size={25} />
                            </Link>
                        </Button>
                    </div>
                    <EditForm recipe={recipe} />
                    <div className='mt-2 flex'>
                        <DeleteButton id={id} />
                    </div>
                </MaxWidthWrapper>
            </section>
        </main>
    )
}
