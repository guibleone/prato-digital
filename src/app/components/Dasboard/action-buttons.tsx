import { Button } from "@/components/ui/button";
import { deleteRecipe } from "@/lib/recipeActions";
import { X } from "lucide-react";

export function DeleteButton({ id }: { id: string }) {

    const deleteInvoiceWithId = deleteRecipe.bind(null, id);

    return (
        <form action={deleteInvoiceWithId} className='flex flex-col gap-10'>
            <Button variant={'destructive'} >
                Excluir
           </Button>
        </form>
    )
}
