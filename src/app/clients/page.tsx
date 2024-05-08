'use client'

import { useGetAllClients } from "@/hooks/client/useGetAllClients";
import { Button } from "../components/Button";
import { ClientCard } from "./components/ClientCard";
import { useEffect, useState } from "react";
import { Client } from "@/domain/entities/client";
import { SkeletonClientCard } from "./components/SkeletonClientCard";

export default function Clients() {

    const { data, isLoading } = useGetAllClients()

    const [allClients, setAllClients] = useState<Client[]>([])

    useEffect(() => {

        if (data !== undefined) {
            setAllClients(data.clients);
        }
    }, [data]);

    return (
        <div className="mt-6 flex flex-col px-6">
            <h1 className="text-center text-2xl">Verifique todos os clientes cadastrados</h1>

            <div className="flex flex-col gap-10">
                <div className="flex justify-end px-6">
                    <Button variant="primary">Cadastrar cliente</Button>
                </div>

                <div className="grid grid-cols-4 gap-5">
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