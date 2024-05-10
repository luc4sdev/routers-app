import * as Dialog from '@radix-ui/react-dialog';
import { Pencil, RouteOff, Router as RouterIcon, Trash2, UserSearch, XIcon } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { useEffect, useState } from 'react';
import { Client } from '@/domain/entities/client';
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

    const { mutate: mutateDeleteClient, isError: isErrorDeleteClient, error: errorDeleteClient, isPending } = useDeleteClient()
    const queryCLient = useQueryClient()

    function isNotErrorAddress(value: any): value is Address {
        return !(value instanceof Error);
    }

    function isNotErrorRouter(value: any): value is Router {
        return !(value instanceof Error);
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
                <Dialog.Content className="overflow-y-scroll scrollbar-hide fixed top-[55%] lg:top-[50%] left-[50%] lg:left-[55%] max-h-[80vh] lg:max-h-[85vh] w-11/12 lg:w-[35vw] xl:w-[25vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-zinc-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="flex items-center gap-3 text-base lg:text-lg font-medium mt-5 lg:mt-0">
                        <UserSearch className='w-6 h-6' /> Detalhes de {client.name}
                    </Dialog.Title>

                    <div className='flex flex-col gap-3'>
                        <div className='mt-5 flex flex-col gap-8 divide-y divide-emerald-500'>
                            <div className='flex flex-col gap-2'>
                                <p className={`font-bold ${client.active ? 'text-emerald-500' : 'text-red-500'}`}>{client.active ? 'Ativo' : 'Inativo'}</p>
                                <p>Nome: {client.name}</p>
                                <p>Pessoa: {client.type === 'FISICA' ? 'Física' : client.type === 'JURIDICA' ? 'Jurídica' : ''}</p>
                                <p>{client.type === 'FISICA' ? 'CPF: ' : client.type === 'JURIDICA' ? 'CNPJ: ' : ''}{client.document}</p>
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

                                {(router && router.deleted === false) ? (
                                    <div className='col-span-2 lg:col-span-1 flex flex-col gap-2 py-8'>
                                        <p className='flex gap-2 items-center'>
                                            <RouterIcon className='w-4 h-4' />Roteador :
                                        </p>
                                        <p>Marca: {router.brand}</p>
                                        <p>Modelo: {router.model}</p>
                                        <p>Endereço IP: {router.ipAddress}</p>
                                        <p>Endereço IPV6: {router.ipv6Address}</p>
                                    </div>
                                ) :
                                    (
                                        <div className='col-span-2 lg:col-span-1 flex justify-center items-center'>
                                            <RouteOff className='w-20 h-20' />
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>


                    <div className="mt-10 flex justify-center gap-5">
                        <Button onClick={() => deleteClient(client.id)} className='flex justify-center items-center bg-red-500 dark:bg-red-500 hover:bg-red-400 dark:hover:bg-red-600 w-1/2'>
                            {isPending ? (
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-200/40 animate-spin  fill-gray-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>

                            ) :
                                (
                                    <span className='flex items-center gap-2'><Trash2 className='w-4 h-4' />Deletar</span>
                                )}
                        </Button>
                        <Button onClick={handleOpenCreateClientDialog} className='w-1/2 flex justify-center items-center gap-2'><Pencil className='w-4 h-4' />Editar</Button>

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