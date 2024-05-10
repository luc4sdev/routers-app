'use client'

import { useEffect, useState } from "react";
import { useGetAllRouters } from "@/hooks/router/useGetAllRouters";
import { Router } from "@/domain/entities/router";
import { CreateRouterDialog } from "./components/CreateRouterDialog";
import { Card } from "../components/Card";
import { SkeletonCard } from "../components/SkeletonCard";
import { Router as RouterIcon } from "lucide-react";


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
            <h1 className="text-center lg:text-2xl">Verifique todos os roteadores cadastrados</h1>

            <div className="flex flex-col gap-10">
                <div className="flex justify-end px-6">
                    <CreateRouterDialog openRouterDialog={openRouterDialog} setOpenCreateRouterDialog={setOpenCreateRouterDialog} routerToBeEdited={routerToBeEdited!} setRouterToBeEdited={setRouterToBeEdited} />
                </div>

                <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {isLoading ? (
                        <SkeletonCard />
                    )
                        :
                        (
                            allRouters.map((router, index) => {
                                return (
                                    <Card
                                        key={router.id}
                                        title="Roteador"
                                        active={router.active!}
                                        router={router}
                                        index={index}
                                        icon={RouterIcon}
                                        setOpenCreateDialog={setOpenCreateRouterDialog}
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