'use client'
import { Button } from "@/app/components/Button";
import { User } from "lucide-react";

interface ClientCardProps {
    name: string
    type: 'FISICA' | 'JURIDICA',
    active: boolean | null
    index: number
}

export function ClientCard({ name, type, active = false, index }: ClientCardProps) {
    return (
        <div className="w-60 bg-zinc-200 dark:bg-zinc-700 flex flex-col justify-center items-center py-3 gap-3 rounded-lg">
            <p>Cliente {index + 1}</p>
            <User className="w-28 h-28" />
            <p>{name}</p>
            <Button>Ver detalhes do cliente</Button>
        </div>
    )
}