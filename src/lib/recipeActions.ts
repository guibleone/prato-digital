'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./data";
import { prisma } from "./db";
import { storage } from "./firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    const image = formData.get('image') as File;

    if(!image) {
        return {
            errors: {
                message: 'Imagem não encontrada. Falha ao criar receita.',
            }
        };
    }

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Falha ao criar receita.',
        };
    }

    const { title, description, ingredients, instructions } = validatedFields.data;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
        return {
            errors: {
                message: 'User not found. Falha ao criar receita.',
            }
        };
    }

    try {

        const recipe = await prisma.recipe.create({
            data: {
                title,
                description,
                ingredients,
                instructions: instructions.split('\n'),
                isPublished,
                authorId: currentUser.id,
            }
        });


        const url = await uploadImage(image, recipe.id)

        await prisma.recipe.update({
            where: {
                id: recipe.id,
            },
            data: {
                image: url ? url as string : null,
            }
        });

    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Falha ao criar receita.',
        };
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function editRecipe(recipeId: string, prevState: State, formData: FormData) {
    const validatedFields = FormSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        ingredients: formData.getAll("ingredients"),
        instructions: formData.get("instructions"),
    });

    const image = formData.get('image') as File;
    const isPublished = formData.get('isPublished') === 'on' ? true : false;

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Falha ao criar receita.',
        };
    }

    const { title, description, ingredients, instructions } = validatedFields.data;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
        return {
            errors: {
                message: 'User not found. Falha ao criar receita.',
            }
        };
    }

    try {

        const url = await uploadImage(image, recipeId)

        await prisma.recipe.update({
            where: {
                id: recipeId,
            },
            data: {
                title,
                description,
                ingredients,
                instructions: instructions.split('\n'),
                isPublished,
                image: url ? url as string : null,
            }
        });

    }

    catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Falha ao criar receita.',
        };
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');

}

export async function deleteRecipe(recipeId: string) {
    try {
        const storageRef = ref(storage, `images/${recipeId}`);
        await deleteObject(storageRef);

        await prisma.recipe.delete({
            where: {
                id: recipeId,
            },
        });
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Delete Task.',
        };
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export const uploadImage = async (image: File, recipeId: string) => {

    try {
        const storageRef = ref(storage, `images/${recipeId}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);

        return url;

    } catch (error) {
        console.error('Firebase Error:', error);
        return {
            message: 'Firebase Error: Failed to Upload Image.',
        };
    }


}