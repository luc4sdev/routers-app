'use client'

import { useGetAllClients } from "@/hooks/client/useGetAllClients";
import { ClientCard } from "./components/ClientCard";
import { useEffect, useState } from "react";
import { Client } from "@/domain/entities/client";
import { SkeletonClientCard } from "./components/SkeletonClientCard";
import { CreateClientDialog } from "./components/Dialog";

export default function Clients() {

    const { data: clients, isLoading } = useGetAllClients()

    const [allClients, setAllClients] = useState<Client[]>([])

    useEffect(() => {

        if (clients !== undefined && Array.isArray(clients)) {
            setAllClients(clients);
        }
    }, [clients]);
    console.log(clients)
    return (
        <div className="mt-6 flex flex-col px-6 gap-10">
            <h1 className="text-center lg:text-2xl">Verifique todos os clientes cadastrados</h1>

            <div className="flex flex-col gap-10">
                <div className="flex justify-end px-6">
                    <CreateClientDialog title="Cadastrar Cliente" />
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {isLoading ? (
                        <SkeletonClientCard />
                    )
                        :
                        (
                            allClients.map((client, index) => {
                                return (
                                    <ClientCard name={client.name} type={client.type} active={client.active} index={index} key={client.id} />
                                )
                            })
                        )}
                </div>
            </div>
        </div>
    )
}