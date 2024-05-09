import * as Dialog from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { useEffect, useState } from 'react';
import { Client } from '@/domain/entities/client';
import { formatCpf } from '@/utils/helpers/format-cpf';
import { formatCnpj } from '@/utils/helpers/format-cnpj';
import { formatDate } from '@/utils/helpers/format-date';
import { formatCreateDate } from '@/utils/helpers/format-create-date';
import { useGetAddress } from '@/hooks/address/useGetAddress';
import { Address } from '@/domain/entities/address';
import { useDeleteClient } from '@/hooks/client/useDeleteClient';
import { useQueryClient } from '@tanstack/react-query';
import { toastMessage } from '@/utils/helpers/toast-message';
import { useGetRouter } from '@/hooks/router/useGetRouter';
import { Router } from '@/domain/entities/router';

interface ClientDataDialogProps {
    client: Client
    setOpenCreateClientDialog: (openDialog: boolean) => void
    setClientToBeEdited: (client: Client | null) => void
}



export function ClientDataDialog({ client, setOpenCreateClientDialog, setClientToBeEdited }: ClientDataDialogProps) {

    const [openDialog, setOpenDialog] = useState(false)
    const [address, setAddress] = useState<Address>()
    const [router, setRouter] = useState<Router>()

    const { data: addressData } = useGetAddress({ addressId: client.addressId })
    const { data: routerData } = useGetRouter({ routerId: client.routerId! })

    const { mutate: mutateDeleteClient, isError: isErrorDeleteClient, error: errorDeleteClient } = useDeleteClient()
    const queryCLient = useQueryClient()

    function isNotErrorAddress(value: any): value is Address {
        return !(value instanceof Error);
    }

    function isNotErrorRouter(value: any): value is Router {
        return !(value instanceof Error);
    }

    function formatDocument(client: Client): string {
        if (client.type === 'FISICA') {
            return formatCpf(client.document);
        } else if (client.type === 'JURIDICA') {
            return formatCnpj(client.document);
        } else {
            return '';
        }
    }

    function handleOpenCreateClientDialog() {
        setOpenCreateClientDialog(true)
        setOpenDialog(false)
        setClientToBeEdited(client)
    }

    async function deleteClient(id: string) {
        mutateDeleteClient({
            id
        },
            {
                onSuccess: () => {
                    queryCLient.invalidateQueries({
                        queryKey: ['get-all-clients'],
                        exact: false
                    })
                    toastMessage({
                        message: 'Cliente deletado com sucesso!',
                        type: 'success'
                    })
                    setOpenDialog(false)
                },
                onError: () => {
                    if (isErrorDeleteClient) {
                        console.error(errorDeleteClient)
                    }
                }
            })
    }

    useEffect(() => {
        if (addressData !== undefined && isNotErrorAddress(addressData)) {
            setAddress(addressData);
        }
    }, [addressData]);

    useEffect(() => {
        if (routerData !== undefined && isNotErrorRouter(routerData)) {
            setRouter(routerData);
        }
    }, [routerData]);

    return (

        <Dialog.Root
            open={openDialog}
        >
            <Dialog.Trigger asChild>
                <Button onClick={() => setOpenDialog(true)} className="w-auto md:w-36 xl:w-auto">Ver detalhes do cliente</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="backdrop-blur-sm fixed inset-0" />
                <Dialog.Content className="overflow-y-scroll scrollbar-hide fixed top-[60%] lg:top-[50%] left-[50%] lg:left-[55%] max-h-[85vh] w-2/3 lg:w-[25vw]  max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-zinc-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-lg font-medium mt-5 lg:mt-0">
                        Detalhes de {client.name}
                    </Dialog.Title>

                    <div className='flex flex-col gap-3'>
                        <div className='mt-5 flex flex-col gap-8 divide-y divide-emerald-500'>
                            <div className='flex flex-col gap-2'>
                                <p className={`font-bold ${client.active ? 'text-emerald-500' : 'text-red-500'}`}>{client.active ? 'Ativo' : 'Inativo'}</p>
                                <p>Nome: {client.name}</p>
                                <p>Pessoa: {client.type === 'FISICA' ? 'Física' : client.type === 'JURIDICA' ? 'Jurídica' : ''}</p>
                                <p>{client.type === 'FISICA' ? 'CPF: ' : client.type === 'JURIDICA' ? 'CNPJ: ' : ''}{formatDocument(client)}</p>
                                <p>Data de nascimento: {formatDate(client.birthDate)}</p>
                                <p>Data de cadastro: {formatCreateDate(String(client.createdAt))}</p>
                            </div>

                            <div className='grid grid-cols-2'>
                                <div className='col-span-2 lg:col-span-1 flex flex-col gap-2 py-8'>
                                    <p>Endereço:</p>
                                    <p>Rua: {address?.street}</p>
                                    <p>CEP: {address?.cep}</p>
                                    <p>Número: {address?.number}</p>
                                    <p>Bairro: {address?.neighborhood}</p>
                                    <p>Cidade: {address?.city}</p>
                                </div>

                                {(router && router.deleted === false) && (
                                    <div className='flex flex-col gap-2 py-8'>
                                        <p>Roteador:</p>
                                        <p>Marca: {router.brand}</p>
                                        <p>Modelo: {router.model}</p>
                                        <p>Endereço IP: {router.ipAddress}</p>
                                        <p>Endereço IPV6: {router.ipv6Address}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="mt-10 flex justify-center gap-5">
                        <Button onClick={() => deleteClient(client.id)} className='bg-red-500 dark:bg-red-500 hover:bg-red-400 dark:hover:bg-red-600 w-1/2'>Deletar</Button>
                        <Button onClick={handleOpenCreateClientDialog} className='w-1/2'>Editar</Button>

                    </div>
                    <Dialog.Close asChild>
                        <button
                            onClick={() => setOpenDialog(false)}
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <XIcon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}