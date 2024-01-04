import { Button } from "@/components/ui/button";
import { deleteRecipe } from "@/lib/recipeActions";
import { X } from "lucide-react";

export function DeleteButton({ id }: { id: string }) {

    const deleteInvoiceWithId = deleteRecipe.bind(null, id);

    return (
        <form action={deleteInvoiceWithId} className='flex flex-col gap-10'>
            <Button className="w-full" variant={'destructive'} >
                <X size={20} className='mr-2' />Excluir 
           </Button>
        </form>
    )
}
