import React from 'react'
import { Plus } from 'lucide-react'
import CardRecipeDashboard from '../CardRecipeDashboard'
import { fetchUserRecipes, getCurrentUser } from '@/lib/data'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function RecipesDashboard() {

    const session = await getServerSession()
    if (!session) {
        redirect('/api/auth/signin')
    }

    const currentUser = await getCurrentUser()
    const recipes = await fetchUserRecipes(currentUser?.id!)

    return (
        <div className='flex flex-col gap-10'>
            <div className='flex justify-between'>
                <h1 className='font-bold text-2xl sm:text-4xl'>
                    Suas Receitas
                </h1>
                <Button asChild>
                    <Link href="/dashboard/receitas/criar">
                        Nova Receita <Plus className='ml-2' />
                    </Link>
                </Button>
            </div>
            {recipes?.length === 0 && (
                <p className='text-muted-foreground'>
                    Você ainda não possui nenhuma receita
                </p>
            )}
            <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 sm:px-0'>
                {recipes?.map((recipe: any) => (
                    <CardRecipeDashboard key={recipe.id} recipe={recipe} />
                ))}

            </div>
        </div>
    )
}
