import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotLogged() {
    return (
        <section className='py-10 sm:py-20'>
            <MaxWidthWrapper>
                <div className='text-center sm:text-start text-lg text-gray-500'>
                    Você precisa estar logado para acessar essa página
                </div>
                <Button asChild>
                    <Link href={'/api/auth/signin'}>
                        Entrar
                    </Link>
                </Button>
            </MaxWidthWrapper>
        </section>
    )
}
