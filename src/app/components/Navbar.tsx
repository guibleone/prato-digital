'use client'
import React, { useEffect, useState } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Drawer from '@/components/ui/drawer'
import { links } from '@/lib/definitions'
import { BookOpenText, Heart, Home } from 'lucide-react'
import { useSession } from 'next-auth/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  


export default function Navbar() {

    const { data } = useSession()
    const user = data?.user

    const [matches, setMatches] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(max-width: 768px)').matches;
        }
        return false;
    });

    useEffect(() => {

        const handler = () => {
            setMatches(window.matchMedia('(max-width: 768px)').matches);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handler);

            return () => {
                window.removeEventListener('resize', handler);
            };
        }
    }, []);



    return (
        <nav>

            <MaxWidthWrapper className='border-b border-gray-400'>
                <div className="flex justify-between items-center py-6">
                    <Link href="/" className='flex items-center gap-2'>
                        <Image src="/assets/logo.svg" width={30} height={30} alt="logo" />
                        <div>
                            <span className="sm:text-2xl text-xl tracking-tighter font-bold text-gray-900">Prato</span>
                            <span className="sm:text-2xl text-xl font-normal text-gray-400">Digital</span>
                        </div>
                    </Link>

                    {/** Desktop */}
                    {!matches ? (
                        <div className='hidden sm:flex gap-5 items-center'>
                            {links.map((link) => (
                                <Link href={link.href} key={link.href}>
                                    <span className='text-gray-900 hover:text-gray-400'>
                                        {link.name}
                                    </span>
                                </Link>
                            ))}
                            {!user ? (
                                <Button variant='default' asChild>
                                    <Link href='/api/auth/signin'>Entrar</Link>
                                </Button>) : (
                                        <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Image className='rounded-full' src={user.image!} width={30} height={30} alt="user" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                          <DropdownMenuLabel>
                                            <span className='text-gray-900 text-sm'>
                                                {user.name!}
                                            </span>
                                          </DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem>
                                            <Link href='/dashboard'>Dashboard</Link>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <Button className='w-full h-8' variant='default' asChild>
                                                <Link href='/api/auth/signout'>Sair</Link>
                                            </Button>
                                          </DropdownMenuItem>

                                        </DropdownMenuContent>
                                      </DropdownMenu>
                            )}

                        </div>) : (

                        <>

                            {/** Mobile */}

                            <Drawer>
                                <div className='flex flex-col gap-5'>
                                    <h1 className='text-gray-900 font-bold text-lg'>
                                        Menu
                                    </h1>
                                    {user && (
                              
                                            <Link className='border-b flex gap-2 items-center font-medium border-gray-900 pb-2' href={'/dashboard'} >
                                                <Image className='rounded-full' src={user.image!} width={25} height={25} alt="user" />
                                                <span className='text-gray-900 text-sm'>
                                                    Dashboard
                                                </span>
                                            </Link>
                                       
                                    )}
                                    <Link className='border-b flex gap-2 items-center font-medium border-gray-900 pb-2' href={'/'} >
                                        <Home size={25} />
                                        <span className='text-gray-900 text-sm  hover:text-gray-400'>
                                            Início
                                        </span>
                                    </Link>

                                    <Link className='border-b flex gap-2 items-center font-medium border-gray-900 pb-2' href={'/receitas'} >
                                        <BookOpenText size={25} />
                                        <span className='text-gray-900 text-sm  hover:text-gray-400'>
                                            Receitas
                                        </span>
                                    </Link>

                                    <Link className='border-b flex gap-2 items-center font-medium border-gray-900 pb-2' href={'/favoritos'} >
                                        <Heart size={25} />
                                        <span className='text-gray-900 text-sm  hover:text-gray-400'>
                                            Favoritos
                                        </span>
                                    </Link>

                                    {!user ? (
                                        <Button variant='default' asChild>
                                            <Link href='/api/auth/signin'>Entrar</Link>
                                        </Button>
                                    ) : (
                                        <Button variant='default' asChild>
                                            <Link href='/api/auth/signout'>Sair</Link>
                                        </Button>
                                    )}
                                </div>
                            </Drawer>
                        </>
                    )}

                </div>
            </MaxWidthWrapper>



        </nav>
    )
}
