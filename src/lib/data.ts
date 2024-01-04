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