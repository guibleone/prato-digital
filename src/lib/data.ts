import { prisma } from "./db";
import { getServerSession } from "next-auth";
import { unstable_noStore as noStore } from 'next/cache';

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};


// pegar receitas do usuario

export const fetchUserRecipes = async (userId: string) => {
  noStore()
  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        authorId: userId,
      },
    });

    return recipes;

  } catch (error: any) {
    return null;
  }
}

export const fetchRecipeById = async (recipeId: string) => {
  noStore()
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true
          }
        }
      }
    });
    return recipe;
  } catch (error: any) {
    return null;
  }
}


// pegar as tres principais receitas

export const fetchTopRecipes = async () => {
  noStore()
  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        isPublished: true,
      },
      take: 3,
    });

    return recipes

  } catch (error: any) {
    return null;
  }
}

// pegar receitas por página

const ITENS_PER_PAGE = 4;
export async function fetchFilteredRecipes(
  query: string,
  currentPage: number,
  isFavorite?: boolean,
) {
  noStore()
  const offset = (currentPage - 1) * ITENS_PER_PAGE;

  try {

    if (isFavorite) {

      const currentUser = await getCurrentUser();

      if (!currentUser) {
        return null;
      }
      const recipes = await prisma.recipe.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
          favorites: {
            some: {
              authorId: currentUser.id,
            },
          },
        },
        take: ITENS_PER_PAGE,
        skip: offset,
      });

      return recipes;
    }

    const recipes = await prisma.recipe.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
        isPublished: true,
      },
      take: ITENS_PER_PAGE,
      skip: offset,
    });
    return recipes;
  } catch (error) {
    return null;
  }
}

export async function fetchRecipesPages(query: string, isFavorite?: boolean) {
  noStore()
  try {

    if (isFavorite) {

      const currentUser = await getCurrentUser();

      if (!currentUser) {
        return null;
      }

      const recipesCount = await prisma.recipe.count({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
          favorites: {
            some: {
              authorId: currentUser.id,
            },
          },
        },
      });

      const totalPages = Math.ceil(recipesCount / ITENS_PER_PAGE);
      return totalPages;
    }

    const recipesCount = await prisma.recipe.count({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
        isPublished: true,
      },
    });

    const totalPages = Math.ceil(recipesCount / ITENS_PER_PAGE);
    return totalPages;

  } catch (error) {
    return null;
  }
}

// PEGAR AVALIAÇÕES DE UMA RECEITA

export async function fetchRecipeReviews(recipeId: string) {
  noStore()
  try {

    const reviews = await prisma.rewiew.findMany({
      where: {
        recipeId,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return reviews;
  }
  catch (error) {
    return null;
  }
}

export async function fetchRecipeLatestReviews(recipeId: string) {
  noStore()
  try {

    const reviews = await prisma.rewiew.findMany({
      where: {
        recipeId,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 6,
    })
    return reviews;
  }
  catch (error) {
    return null;
  }
}

export async function fetchReviews(recipeId: string) {
  noStore()
  try {
    const countReviews = await prisma.rewiew.count({
      where: {
        recipeId,
      },
    });


    return countReviews.toString();

  } catch (error) {
    return null;
  }
}