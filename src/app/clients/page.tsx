'use client'

import { useGetAllClients } from "@/hooks/client/useGetAllClients";
import { useEffect, useState } from "react";
import { Client } from "@/domain/entities/client";
import { CreateClientDialog } from "./components/CreateClientDialog";
import { Card } from "../components/Card";
import { SkeletonCard } from "../components/SkeletonCard";
import { User } from "lucide-react";

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
                    <CreateClientDialog
                        openClientDialog={openClientDialog}
                        setOpenCreateClientDialog={setOpenCreateClientDialog}
                        clientToBeEdited={clientToBeEdited!}
                        setClientToBeEdited={setClientToBeEdited}
                    />
                </div>

                <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {isLoading ? (
                        <SkeletonCard />
                    )
                        :
                        (
                            allClients.map((client, index) => {
                                return (
                                    <Card
                                        key={client.id}
                                        title="Cliente"
                                        active={client.active!}
                                        client={client}
                                        index={index}
                                        icon={User}
                                        setOpenCreateDialog={setOpenCreateClientDialog}
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