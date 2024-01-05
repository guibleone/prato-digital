'use client'

import { Button } from "@/components/ui/button";
import { deleteRecipe } from "@/lib/recipeActions";
import { X } from "lucide-react";
import { useFormStatus } from "react-dom";
import { TailSpin } from "react-loader-spinner";

function Submit() {
    const { pending } = useFormStatus();
    return (
        <Button variant={'destructive'} className='py-2' type="submit" disabled={pending}>
            {pending ? <TailSpin height={20} width={20} color='black' /> : <>
            <X size={20} className='mr-2' />Excluir </>}
        </Button>
    );
}


export function DeleteButton({ id }: { id: string }) {

    const deleteInvoiceWithId = deleteRecipe.bind(null, id);

    return (
        <form action={deleteInvoiceWithId} className='flex flex-col gap-10'>
           <Submit />
        </form>
    )
}
