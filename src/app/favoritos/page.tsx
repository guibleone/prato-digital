import { fetchRecipesPages } from '@/lib/data'
import React from 'react'
import MaxWidthWrapper from '../components/MaxWidthWrapper'
import Search from '../components/search-input'
import Recipes from '../components/Receitas/Recipes'
import Pagination from '../components/pagination'
import { getServerSession } from 'next-auth'
import NotLogged from '../components/not-logged'

export default async function FavoritosPage({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: number
  }
}) {

  const query = searchParams?.query || ''
  const currentPage = searchParams?.page || 1

  const totalPages = await fetchRecipesPages(query, true)

  const currentUser = await getServerSession()

  if (!currentUser) {
    return (
      <NotLogged />
    )
  }

  return (
    <section className='py-10 sm:py-20'>
      <MaxWidthWrapper>
        <div className='flex flex-col gap-10'>
          <div className="sm:self-end flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder='Procure receitas...' />
          </div>
          <div className=''>
            <Recipes isFavorite={true} query={query} currentPage={currentPage} />
          </div>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages!} />
          </div>
        </div>
      </MaxWidthWrapper>
    </section >
  )
}
