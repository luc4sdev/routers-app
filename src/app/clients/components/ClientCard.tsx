'use client'
import { Button } from "@/app/components/Button";
import { User } from "lucide-react";
import { useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { CreateClientDialog } from "./Dialog";

interface ClientCardProps {
    name: string
    type: 'FISICA' | 'JURIDICA',
    active: boolean | null
    index: number
}

export function ClientCard({ name, type, active = false, index }: ClientCardProps) {

    return (
        <>
            <div className="lg:w-40 xl:w-60 col-span-4 md:col-span-1 lg:col-span-1 bg-zinc-200 dark:bg-zinc-700 flex flex-col justify-center items-center py-3 gap-3 rounded-lg">
                <div className="w-full relative flex justify-center items-center">
                    <p>Cliente {index + 1}</p>
                    <p className={`absolute right-3 rounded-lg px-2 text-sm text-white ${active ? 'bg-emerald-600' : 'bg-red-500'}`}>{active ? 'Ativo' : 'Inativo'}</p>
                </div>
                <User className="w-28 h-28" />
                <p className="truncate">{name}</p>
                <CreateClientDialog title="Ver detalhes do cliente" />
            </div>




        </>
    )
}