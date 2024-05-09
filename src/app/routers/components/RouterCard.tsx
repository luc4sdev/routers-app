'use client'

import { Router as RouterIcon } from "lucide-react";
import { RouterDataDialog } from "./RouterDataDialog";
import { Router } from "@/domain/entities/router";

interface RouterCardProps {
    router: Router
    index: number
    setOpenCreateRouterDialog: (openDialog: boolean) => void
    setRouterToBeEdited: (router: Router | null) => void
}

export function RouterCard({ router, index, setOpenCreateRouterDialog, setRouterToBeEdited }: RouterCardProps) {

    return (
        <>
            <div className="lg:w-60 col-span-4 md:col-span-1 bg-zinc-200 dark:bg-zinc-700 flex flex-col justify-center items-center py-3 gap-3 rounded-lg">
                <div className="w-full relative flex justify-center items-center">
                    <p>Roteador {index + 1}</p>
                    <p className={`absolute right-3 rounded-lg px-1.5 text-sm text-white ${router.active ? 'bg-emerald-600' : 'bg-red-500'}`}>{router.active ? 'Ativo' : 'Inativo'}</p>
                </div>
                <RouterIcon className="w-24 h-24" />
                <p className="truncate">{router.brand}</p>
                <RouterDataDialog router={router} setOpenCreateRouterDialog={setOpenCreateRouterDialog} setRouterToBeEdited={setRouterToBeEdited} />
            </div>




        </>
    )
}