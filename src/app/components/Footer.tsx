import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Image from 'next/image'
import Link from 'next/link'
import { links } from '@/lib/definitions'



export default function Footer() {
    return (
        <footer className='py-12'>
            <MaxWidthWrapper>
                <div className='flex flex-col '>
                    <div className='flex flex-col gap-10 sm:flex-row items-center justify-between'>
                        <div className='flex flex-col gap-2 items-center sm:items-start'>
                            <div className='flex gap-2'>
                                <Image src="/assets/logo.svg" width={30} height={30} alt="logo" />
                                <span className="text-gray-900 text-2xl font-bold tracking-tight sm:text-4xl">
                                    Prato<span className="text-gray-400 font-normal">Digital</span>
                                </span>
                            </div>
                            <span className='text-sm text-muted-foreground'>
                                Crie receitas e compartilhe com o mundo
                            </span>
                        </div>

                        <div className='grid gap-10 grid-cols-3'>
                            <div className='flex flex-col'>
                                <h3 className='font-bold'>
                                    Páginas
                                </h3>
                                {links.map((link) => (
                                    <div className='flex flex-col' key={link.href}>
                                        <Link href={link.href} >
                                            <span className='text-sm text-gray-900 hover:text-gray-400'>
                                                {link.name}
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            <div className='flex flex-col'>
                                <h3 className='font-bold'>
                                   Receitas
                                </h3>
                                <div className='flex flex-col'>
                                    <Link href={'/entrar'} >
                                        <span className='text-sm text-gray-900 hover:text-gray-400'>
                                            Criar
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='mt-12 self-center'>
                        <p className='text-sm text-muted-foreground'>
                            {new Date().getFullYear()} @  <a className='underline' href='https://github.com/guibleone'>Guilherme Leone</a>
                        </p>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    )
}
