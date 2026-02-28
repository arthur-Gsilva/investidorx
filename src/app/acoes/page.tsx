import { TableStock } from "@/components/tableStock";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Ações da Bolsa",
    description: "Página de ações onde você pode começar a alavancar sua vida financeira.",
};

export default function page(){
    return(
        <div className="px-6 mx-auto max-w-7xl">
            <h1 className="text-center my-8 text-xl font-bold">Lista de Ações</h1>

            <Suspense fallback={<div>Carregando...</div>}>
                <TableStock />
            </Suspense>
            
        </div>
    )
}