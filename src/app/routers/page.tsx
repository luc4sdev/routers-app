'use client'

import { useEffect, useState } from "react";
import { SkeletonRouterCard } from "./components/SkeletonRouterCard";
import { RouterCard } from "./components/RouterCard";
import { useGetAllRouters } from "@/hooks/router/useGetAllRouters";
import { Router } from "@/domain/entities/router";
import { CreateRouterDialog } from "./components/CreateRouterDialog";


export default function Routers() {

    const { data: routers, isLoading } = useGetAllRouters()

    const [allRouters, setAllRouters] = useState<Router[]>([])
    const [openRouterDialog, setOpenCreateRouterDialog] = useState(false)
    const [routerToBeEdited, setRouterToBeEdited] = useState<Router | null>()


    useEffect(() => {

        if (routers !== undefined && Array.isArray(routers)) {
            setAllRouters(routers);
        }
    }, [routers]);

    return (
        <div className="mt-6 flex flex-col px-6 gap-10">
            <h1 className="text-center lg:text-2xl">Verifique todos os clientes cadastrados</h1>

            <div className="flex flex-col gap-10">
                <div className="flex justify-end px-6">
                    <CreateRouterDialog openRouterDialog={openRouterDialog} setOpenCreateRouterDialog={setOpenCreateRouterDialog} routerToBeEdited={routerToBeEdited!} setRouterToBeEdited={setRouterToBeEdited} />
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {isLoading ? (
                        <SkeletonRouterCard />
                    )
                        :
                        (
                            allRouters.map((router, index) => {
                                return (
                                    <RouterCard key={router.id}
                                        router={router}
                                        index={index}
                                        setOpenCreateRouterDialog={setOpenCreateRouterDialog}
                                        setRouterToBeEdited={setRouterToBeEdited}
                                    />
                                )
                            })
                        )}
                </div>
            </div>
        </div>
    )
}