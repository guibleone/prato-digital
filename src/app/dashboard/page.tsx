import { getServerSession } from 'next-auth'
import React from 'react'
import { redirect } from "next/navigation";
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import CardRecipeDashboard from '../components/CardRecipeDashboard';
import Image from 'next/image';

export default async function page() {

    const session = await getServerSession()
    if (!session) {
        redirect('/api/auth/signin')
    }

    return (
        <main >
            <section className='py-20'>
                <MaxWidthWrapper>
                    <div className='flex flex-col gap-10'>
                        <div className='flex justify-between'>
                            <h1 className='font-bold text-2xl sm:text-4xl'>
                                Suas Receitas
                            </h1>
                            <Button asChild>
                                <Link href="/dashboard/receitas/nova">
                                    Nova Receita <Plus className='ml-2' />
                                </Link>
                            </Button>
                        </div>
                        <div className='flex flex-col justify-between sm:flex-row gap-10 px-8 sm:px-0'>
                            <CardRecipeDashboard />
                            <CardRecipeDashboard />
                            <CardRecipeDashboard />

                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            <section className='bg-gray-100 py-20'>
                <MaxWidthWrapper className=' '>
                    <div className='flex flex-col text-center sm:text-start sm:flex-row sm:justify-between items-center'>
                        <div>
                            <h1 className='font-bold text-gray-900 text-2xl sm:text-4xl'>
                                Você é um cozinheiro de <span className='bg-yellow-500 text-gray-100 px-3.5'>mão cheia</span>
                            </h1>
                
                            <p className='text-muted-foreground mt-4'>
                                (200 avaliações) nos últimos 30 dias
                            </p>
                            <div className='flex justify-center sm:justify-start items-center gap-1 mt-1'>
                                <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2l3.09 6.89L22 9.3l-5 4.87 1.18 6.88L12 17.77l-6.18 3.28L7 14.17l-5-4.87 6.91-.41L12 2z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2l3.09 6.89L22 9.3l-5 4.87 1.18 6.88L12 17.77l-6.18 3.28L7 14.17l-5-4.87 6.91-.41L12 2z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2l3.09 6.89L22 9.3l-5 4.87 1.18 6.88L12 17.77l-6.18 3.28L7 14.17l-5-4.87 6.91-.41L12 2z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2l3.09 6.89L22 9.3l-5 4.87 1.18 6.88L12 17.77l-6.18 3.28L7 14.17l-5-4.87 6.91-.41L12 2z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2l3.09 6.89L22 9.3l-5 4.87 1.18 6.88L12 17.77l-6.18 3.28L7 14.17l-5-4.87 6.91-.41L12 2z" />
                                </svg>

                            </div>
                        </div>

                        <div>
                            <Image src='/assets/Cooking-bro.png' width={400} height={400} alt='Continue cozinhando' />
                        </div>

                    </div>
                </MaxWidthWrapper>
            </section>
        </main>
    )
}
