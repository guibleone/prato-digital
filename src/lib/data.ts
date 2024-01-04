import { prisma } from "./db";
import { getServerSession } from "next-auth";

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
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });
    return recipe;
  } catch (error: any) {
    return null;
  }
}
