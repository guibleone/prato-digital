'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {getCurrentUser} from "./data";
import { prisma } from "./db";

const FormSchema = z.object({
    title: z.string().min(3, { message: "Título deve ter no mínimo 3 caracteres" }),
    description: z.string().min(10, { message: "Descrição deve ter no mínimo 10 caracteres" }),
    ingredients: z.array(z.string().min(3, { message: "Ingrediente deve ter no mínimo 3 caracteres" })),
    instructions: z.string().min(10, { message: "Instruções deve ter no mínimo 10 caracteres" }),
    isPublished: z.string().optional(),
})

export type State = {
    errors?: {
        title?: string[],
        description?: string[],
        ingredients?: string[],
        instructions?: string[],
    },
    message?: string | null;
}

export async function createRecipe(prevState: State, formData: FormData) {

    const validatedFields = FormSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        ingredients: formData.getAll("ingredients"),
        instructions: formData.get("instructions"),
    });

    const isPublished = formData.get('isPublished') === 'on' ? true : false;

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Task.',
        };
    }

    const { title, description, ingredients, instructions } = validatedFields.data;

    const cuurentUser = await getCurrentUser();

    if (!cuurentUser?.id || !cuurentUser?.email) {
        return {
            errors: {
                message: 'User not found. Failed to Create Task.',
            }
        };
    }

    try {
        console.log('Creating Recipe...');
        await prisma.recipe.create({
            data: {
                title,
                description,
                ingredients,
                instructions: instructions.split('\n'),
                isPublished,
                authorId: cuurentUser.id 
            }
        });
        console.log('Recipe Created!');

    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Create Task.',
        };
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function editRecipe(recipeId: string, prevState: State, formData: FormData) {

}
