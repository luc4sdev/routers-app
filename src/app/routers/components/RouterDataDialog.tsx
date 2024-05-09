import * as Dialog from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { useEffect, useState } from 'react';
import { Client } from '@/domain/entities/client';
import { formatCpf } from '@/utils/helpers/format-cpf';
import { formatCnpj } from '@/utils/helpers/format-cnpj';
import { useDeleteClient } from '@/hooks/client/useDeleteClient';
import { useQueryClient } from '@tanstack/react-query';
import { toastMessage } from '@/utils/helpers/toast-message';
import { Router } from '@/domain/entities/router';
import { useGetClient } from '@/hooks/client/useGetClient';
import { useDeleteRouter } from '@/hooks/router/useDeleteRouter';

interface RouterDataDialogProps {
    router: Router
    setOpenCreateRouterDialog: (openDialog: boolean) => void
    setRouterToBeEdited: (router: Router | null) => void
}



export function RouterDataDialog({ router, setOpenCreateRouterDialog, setRouterToBeEdited }: RouterDataDialogProps) {

    const [openDialog, setOpenDialog] = useState(false)

    const [allClientsInRouter, setAllClientsInRouter] = useState<Client[]>([])
    const [allClientsNotDeletedInRouter, setAllClientsNotDeletedInRouter] = useState<Client[]>([])
    const { data: clientData } = useGetClient(router.clientsIds ? router.clientsIds : []);


    const { mutate: mutateDeleteRouter, isError: isErrorDeleteRouter, error: errorDeleteRouter } = useDeleteRouter()
    const queryCLient = useQueryClient()


    function isNotError(value: any): value is Client[] {
        return !(value instanceof Error);
    }

    function handleOpenCreateRouterDialog() {
        setOpenCreateRouterDialog(true)
        setOpenDialog(false)
        setRouterToBeEdited(router)
    }

    async function deleteRouter(id: string) {
        mutateDeleteRouter({
            id
        },
            {
                onSuccess: () => {
                    queryCLient.invalidateQueries({
                        queryKey: ['get-all-routers'],
                        exact: false
                    })
                    toastMessage({
                        message: 'Roteador deletado com sucesso!',
                        type: 'success'
                    })
                    setOpenDialog(false)
                },
                onError: () => {
                    if (isErrorDeleteRouter) {
                        console.error(errorDeleteRouter)
                    }
                }
            })
    }


    useEffect(() => {

        if (clientData !== undefined && isNotError(clientData)) {
            setAllClientsInRouter(clientData);
        }
    }, [clientData]);

    useEffect(() => {
        setAllClientsNotDeletedInRouter(allClientsInRouter.filter(client => !client.deleted));
    }, [allClientsInRouter]);
    return (

        <Dialog.Root
            open={openDialog}
        >
            <Dialog.Trigger asChild>
                <Button onClick={() => setOpenDialog(true)} className="w-auto md:w-36 xl:w-auto">Ver detalhes do roteador</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="backdrop-blur-sm data-[state=open]: fixed inset-0" />
                <Dialog.Content className="overflow-y-scroll lg:overflow-y-hidden data-[state=open]: fixed top-[60%] lg:top-[50%] left-[50%] lg:left-[55%] max-h-[85vh] w-2/3 lg:w-[25vw]  max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-zinc-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-lg font-medium mt-5 lg:mt-0">
                        Detalhes do roteador {router.brand}
                    </Dialog.Title>

                    <div className='flex flex-col gap-3'>
                        <div className='mt-5 flex flex-col gap-8 divide-y divide-emerald-500'>
                            <div className='flex flex-col gap-2'>
                                <p className={`font-bold ${router.active ? 'text-emerald-500' : 'text-red-500'}`}>{router.active ? 'Ativo' : 'Inativo'}</p>
                                <p>Endereço IP: {router.ipAddress}</p>
                                <p>Endereço IPV6: {router.ipv6Address}</p>
                                <p>Marca: {router.brand}</p>
                                <p>Modelo: {router.model}</p>

                                {(allClientsNotDeletedInRouter && allClientsNotDeletedInRouter.length > 0) ? (
                                    <div className='flex flex-col gap-3 mt-8'>
                                        <p>Clientes:</p>
                                        {allClientsNotDeletedInRouter.map(client => {
                                            return (
                                                <p>- {client.name}</p>
                                            )
                                        })}
                                    </div>
                                )
                                    :
                                    (
                                        <div className='mt-8'>
                                            <p>Não possui nenhum cliente cadastrado.</p>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>


                    <div className="mt-10 flex justify-center gap-5">
                        <Button onClick={() => deleteRouter(router.id)} className='bg-red-500 dark:bg-red-500 hover:bg-red-400 dark:hover:bg-red-600 w-1/2'>Deletar</Button>
                        <Button onClick={handleOpenCreateRouterDialog} className='w-1/2'>Editar</Button>

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