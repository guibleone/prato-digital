import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CardRecipeDashboard() {
    return (
        <div
            className="bg-white rounded-lg shadow-xl hover:cursor-pointer hover:shadow-2xl transition-all duration-300"
        >
            <div className="px-4 py-2">
                <div className="flex flex-col sm:flex-row items-center mt-2 gap-2">
                    <h3 className="text-xl font-bold">
                        Bolo de Cenoura
                    </h3>
                    <span className="text-sm text-muted-foreground font-bold ">
                        Rascunho
                    </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                    O bolo de cenoura é um bolo simples, de cor amarela ou laranja, que leva cenoura ralada na massa. É um bolo comum nos países ocidentais, em especial no Brasil, Portugal e nos Estados Unidos.
                </p>

                <div className="flex gap-2 justify-end mt-6">
                    <Button asChild>
                        <Link href="/dashboard/receitas/editar">
                            <Edit size={25} />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>

    )
}
