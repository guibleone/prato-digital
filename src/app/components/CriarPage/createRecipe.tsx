'use client'
import { X } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useFormState, useFormStatus } from "react-dom";
import { createRecipe } from "@/lib/recipeActions";
import { Button } from "@/components/ui/button";
import { TailSpin } from "react-loader-spinner";



function Submit() {
    const { pending } = useFormStatus();
    return (
        <Button className='py-2' type="submit" disabled={pending}>
            {pending ? <TailSpin height={20} width={20} color='black' /> : <>
                Criar
            </>}
        </Button>
    );
}

export default function CreateRecipe() {
    const initialState = { message: null, errors: {} };

    // @ts-ignore
    const [state, dispatch] = useFormState(createRecipe, initialState)

    const { toast } = useToast()

    const [ingredient, setIngredient] = useState<string>('')
    const [ingredients, setIngredients] = useState<string[]>([])

    const handleIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIngredient(e.target.value)
    }

    const handleAddIngredient = (ingredient: string) => {
        if (ingredient === '') return toast({
            title: 'Ingrediente vazio',
            description: 'Por favor, insira um ingrediente',
        })
        if (ingredients.includes(ingredient)) return toast({
            title: 'Ingrediente já adicionado',
            description: 'Por favor, insira um ingrediente diferente',
        })
        if (ingredients.length >= 9) return toast({
            title: 'Limite de ingredientes atingido',
            description: 'Por favor, remova um ingrediente para adicionar outro',
        })
        setIngredients([...ingredients, ingredient])
        
    }

    return (
        <form action={dispatch} className='flex flex-col gap-10'>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-5'>
                    <label htmlFor='title' className='font-bold text-gray-900'>
                        Nome da receita
                    </label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        className='border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
                    />
                    <div id="title-error" aria-live="polite" aria-atomic="true">
                        {/**@ts-ignore */}
                        {state?.errors?.title && state?.errors.title.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <label htmlFor='description' className='font-bold text-gray-900'>
                        Descrição
                    </label>
                    <textarea
                        name='description'
                        id='description'
                        className='border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
                    ></textarea>
                    <div id="description-error" aria-live="polite" aria-atomic="true">
                        {/**@ts-ignore */}
                        {state?.errors?.description && state?.errors.description.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-5'>
                    <label htmlFor='ingredients' className='font-bold text-gray-900'>
                        Ingredientes
                    </label>
                    <input onChange={handleIngredient} type="text" className='border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent' />
                    <button onClick={() => handleAddIngredient(ingredient)} type="button" className='border border-gray-500 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent'>Adicionar</button>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="flex  justify-between bg-gray-300 px-4 py-2 rounded-full">
                                <p className="truncate">{ingredient}</p>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setIngredients(ingredients.filter((_, i) => i !== index))
                                }}>
                                    <X className='ml-2' size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <input type="hidden" name="ingredients" value={ingredients} aria-hidden='true' />
                    <div id="ingredients-error" aria-live="polite" aria-atomic="true">
                        {/**@ts-ignore */}
                        {state?.errors?.ingredients && state?.errors.ingredients.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <label htmlFor='instructions' className='font-bold text-gray-900'>
                        Instruções
                    </label>
                    <textarea
                        name='instructions'
                        id='instructions'
                        className='border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
                    ></textarea>
                    <div id="instructions-error" aria-live="polite" aria-atomic="true">
                        {/**@ts-ignore */}
                        {state?.errors?.instructions && state?.errors.instructions.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <label htmlFor='image' className='font-bold text-gray-900'>
                        Imagem
                    </label>
                    <input
                        className="border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        name='image'
                        type='file' />
                    { }
                </div>
                <div>
                    {/**@ts-ignore */}
                    {state?.message && (
                        <p className="mt-2 text-sm text-red-500">
                            {state.message}
                        </p>
                    )}
                </div>
                <div className="flex items-center">
                    <label htmlFor="isPublished" className='font-bold text-gray-900'>
                        Publicar
                    </label>
                    <input className="ml-2" type="checkbox" name="isPublished" id="isPublished" />
                </div>
            </div>
            <div>
                <Submit />
            </div>
        </form>
    )
}
