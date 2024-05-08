'use client'

import { User } from "lucide-react";
import { Client } from "@/domain/entities/client";
import { ClientDataDialog } from "./ClientDataDialog";

interface ClientCardProps {
    client: Client
    index: number
    setOpenCreateClientDialog: (openDialog: boolean) => void
    setClientToBeEdited: (client: Client | null) => void
}

export function ClientCard({ client, index, setOpenCreateClientDialog, setClientToBeEdited }: ClientCardProps) {

    return (
        <>
            <div className="lg:w-40 xl:w-60 col-span-4 md:col-span-1 lg:col-span-1 bg-zinc-200 dark:bg-zinc-700 flex flex-col justify-center items-center py-3 gap-3 rounded-lg">
                <div className="w-full relative flex justify-center items-center">
                    <p>Cliente {index + 1}</p>
                    <p className={`absolute right-3 rounded-lg px-2 text-sm text-white ${client.active ? 'bg-emerald-600' : 'bg-red-500'}`}>{client.active ? 'Ativo' : 'Inativo'}</p>
                </div>
                <User className="w-28 h-28" />
                <p className="truncate">{client.name}</p>
                <ClientDataDialog client={client} setOpenCreateClientDialog={setOpenCreateClientDialog} setClientToBeEdited={setClientToBeEdited} />
            </div>




        </>
    )
}