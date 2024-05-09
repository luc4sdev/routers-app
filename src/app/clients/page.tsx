'use client'

import { useGetAllClients } from "@/hooks/client/useGetAllClients";
import { ClientCard } from "./components/ClientCard";
import { useEffect, useState } from "react";
import { Client } from "@/domain/entities/client";
import { SkeletonClientCard } from "./components/SkeletonClientCard";
import { CreateClientDialog } from "./components/CreateClientDialog";

export default function Clients() {

    const { data: clients, isLoading } = useGetAllClients()

    const [allClients, setAllClients] = useState<Client[]>([])
    const [openClientDialog, setOpenCreateClientDialog] = useState(false)
    const [clientToBeEdited, setClientToBeEdited] = useState<Client | null>()


    useEffect(() => {

        if (clients !== undefined && Array.isArray(clients)) {
            setAllClients(clients);
        }
    }, [clients]);

    return (
        <div className="mt-6 flex flex-col px-6 gap-10">
            <h1 className="text-center lg:text-2xl">Verifique todos os clientes cadastrados</h1>

            <div className="flex flex-col gap-10">
                <div className="flex justify-end px-6">
                    <CreateClientDialog openClientDialog={openClientDialog} setOpenCreateClientDialog={setOpenCreateClientDialog} clientToBeEdited={clientToBeEdited!} setClientToBeEdited={setClientToBeEdited} />
                </div>

                <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {isLoading ? (
                        <SkeletonClientCard />
                    )
                        :
                        (
                            allClients.map((client, index) => {
                                return (
                                    <ClientCard key={client.id}
                                        client={client}
                                        index={index}
                                        setOpenCreateClientDialog={setOpenCreateClientDialog}
                                        setClientToBeEdited={setClientToBeEdited}
                                    />
                                )
                            })
                        )}
                </div>
            </div>
        </div>
    )
}