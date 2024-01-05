
'use client'
import { Button } from '@/components/ui/button'
import { createReview } from '@/lib/recipeActions'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { TailSpin } from 'react-loader-spinner'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


function Submit() {
    const { pending } = useFormStatus();
    return (
        <Button className='py-2' type="submit" disabled={pending}>
            {pending ? <TailSpin height={20} width={20} color='black' /> : "Avaliar"}
        </Button>
    );
}

export default function ReviewForm({ recipeId }: { recipeId: string }) {

    const initialState = { message: null, errors: {}, successMessage: null };

    const createReviewWithId = createReview.bind(null, recipeId)
    // @ts-ignore
    const [state, dispatch] = useFormState(createReviewWithId, initialState)

    return (
        <form action={dispatch}>
            <div className='flex flex-col gap-2'>
                <Select name='rating'>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sua nota" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5 estrelas</SelectItem>
                        <SelectItem value="4">4 estrelas</SelectItem>
                        <SelectItem value="3">3 estrelas</SelectItem>
                        <SelectItem value="2">2 estrelas</SelectItem>
                        <SelectItem value="1">1 estrelas</SelectItem>
                    </SelectContent>
                </Select>

                <div id="rating-error" aria-live="polite" aria-atomic="true">
                    {/**@ts-ignore */}
                    {state?.errors?.rating && state?.errors.rating.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
                <input name='text' className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent' type="text" placeholder='Deixe um comentário' />
                <div id="text-error" aria-live="polite" aria-atomic="true">
                    {/**@ts-ignore */}
                    {state?.errors?.text && state?.errors.text.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>
            <div className='self-end mt-3'>
                <Submit />
            </div>
        </form>
    )
}
