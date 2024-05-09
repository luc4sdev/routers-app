import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon, User, XIcon } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { InputControl, InputRoot } from '@/app/components/Form/Input';
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from '@tanstack/react-query';
import { toastMessage } from '@/utils/helpers/toast-message';
import { Router } from '@/domain/entities/router';
import { useCreateRouter } from '@/hooks/router/useCreateRouter';
import { useGetAllClients } from '@/hooks/client/useGetAllClients';
import { useEffect, useState } from 'react';
import { Client } from '@/domain/entities/client';
import { useUpdateRouter } from '@/hooks/router/useUpdateRouter';

interface CreateRouterDialogProps {
    openRouterDialog: boolean
    routerToBeEdited: Router | null
    setOpenCreateRouterDialog: (openDialog: boolean) => void
    setRouterToBeEdited: (router: Router | null) => void
}


const createClientSchema = z.object({
    ipAddress: z.string().min(1, 'Insira um endereço IP'),
    ipv6Address: z.string().min(1, 'Insira um endereço IPV6'),
    brand: z.string().min(1, 'Insira a marca do roteador'),
    model: z.string().min(1, 'Insira o modelo do roteador'),
    clientsIds: z.array(z.string()),
    active: z.boolean().default(false),
});



type createClientSchema = z.infer<typeof createClientSchema>

export function CreateRouterDialog({ openRouterDialog, routerToBeEdited, setOpenCreateRouterDialog, setRouterToBeEdited }: CreateRouterDialogProps) {

    const [allClients, setAllClients] = useState<Client[]>([])
    const [clientsIds, setClientsIds] = useState<string[]>([])

    const { data: clients } = useGetAllClients()
    const { mutate: mutateCreateRouter } = useCreateRouter()
    const { mutate: mutateUpdateRouter } = useUpdateRouter()

    const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm<createClientSchema>({
        resolver: zodResolver(createClientSchema)

    })
    const queryCLient = useQueryClient()
    console.log(routerToBeEdited)

    const addClientId = (checked: Checkbox.CheckedState, newClientId: string) => {

        if (Boolean(checked)) {
            setClientsIds(prevState => [...prevState, newClientId]);
            return
        }
        else {
            const auxClientsIds = [...clientsIds];
            const indexOfId = auxClientsIds.findIndex(clientId => clientId === newClientId);
            console.log(indexOfId);
            if (indexOfId !== -1) {
                auxClientsIds.splice(indexOfId, 1);
                setClientsIds(auxClientsIds);
            }
        }
    };

    useEffect(() => {
        setValue("clientsIds", clientsIds)
    }, [clientsIds])

    async function createClient(data: createClientSchema) {
        try {
            mutateCreateRouter({
                ipAddress: data.ipAddress,
                ipv6Address: data.ipv6Address,
                brand: data.brand,
                model: data.model,
                clientsIds: data.clientsIds,
                active: data.active
            }, {
                onSuccess: () => {
                    queryCLient.invalidateQueries({
                        queryKey: ['get-all-routers'],
                        exact: false
                    })
                    toastMessage({
                        message: 'Roteador adicionado com sucesso!',
                        type: 'success'
                    })
                    reset()
                    setOpenCreateRouterDialog(false)
                },
                onError: (error) => {
                    console.error(error)
                }
            })

        } catch (error: any) {
            return console.error(error.message)
        } finally {
        }
    }


    async function updateRouter(data: createClientSchema) {

        try {
            mutateUpdateRouter({
                id: routerToBeEdited ? routerToBeEdited.id : '',
                ipAddress: data.ipAddress,
                ipv6Address: data.ipv6Address,
                brand: data.brand,
                model: data.model,
                clientsIds: data.clientsIds,
                active: data.active
            }, {
                onSuccess: () => {
                    queryCLient.invalidateQueries({
                        queryKey: ['get-all-routers'],
                        exact: false
                    })
                    toastMessage({
                        message: 'Roteador atualizado com sucesso!',
                        type: 'success'
                    })
                    reset()
                    setOpenCreateRouterDialog(false)
                    setRouterToBeEdited(null)

                },
                onError: (error) => {
                    console.error(error)
                }
            })

        } catch (error: any) {
            return console.error(error.message)
        } finally {
        }
    }

    useEffect(() => {
        if (routerToBeEdited) {
            setValue("ipAddress", routerToBeEdited.ipAddress)
            setValue("ipv6Address", routerToBeEdited.ipv6Address)
            setValue("brand", routerToBeEdited.brand)
            setValue("model", routerToBeEdited.model)
            setClientsIds(getValues("clientsIds"))
        }
    }, [routerToBeEdited])


    useEffect(() => {

        if (clients !== undefined && Array.isArray(clients)) {
            setAllClients(clients);
        }
    }, [clients]);

    return (
        <Dialog.Root
            open={openRouterDialog}
        >
            <Dialog.Trigger asChild>
                <Button onClick={() => setOpenCreateRouterDialog(true)} className="w-auto md:w-36 xl:w-auto">Cadastrar Roteador</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="backdrop-blur-sm data-[state=open]: fixed inset-0" />
                <Dialog.Content className="overflow-y-scroll data-[state=open]: fixed top-[60%] lg:top-[50%] left-[50%] lg:left-[55%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-zinc-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-lg font-medium">
                        Cadastro
                    </Dialog.Title>
                    <Dialog.Description className="mt-[10px] mb-5 text-sm leading-normal">
                        Insira os dados do roteador.
                    </Dialog.Description>

                    <div className='flex flex-col lg:grid grid-cols-2 gap-3'>

                        <fieldset className="mb-[15px] flex flex-col lg:flex-row lg:justify-between items-center gap-10">
                            <label className="text-sm" htmlFor="name">
                                Endereço IP
                            </label>
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <InputRoot>
                                    <InputControl id="ipAddress" type="text" placeholder='192.168.1.1' {...register("ipAddress")} />
                                </InputRoot>
                                <p className="text-xs text-red-500 font-semibold">{errors.ipAddress?.message}</p>
                            </div>
                        </fieldset>

                        <fieldset className="mb-[15px] flex flex-col lg:flex-row lg:justify-between items-center gap-10">
                            <label className="text-sm" htmlFor="ipv6Address">
                                Endereço IPV6
                            </label>
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <InputRoot>
                                    <InputControl id="ipv6Address" type="text" placeholder='0000:0000:0000:0000:0000:0000:0000:0000' {...register("ipv6Address")} />
                                </InputRoot>
                                <p className="text-xs text-red-500 font-semibold">{errors.ipv6Address?.message}</p>
                            </div>
                        </fieldset>



                        <fieldset className="mb-[15px] flex flex-col lg:flex-row lg:justify-between items-center gap-10">
                            <label className="text-sm" htmlFor="brand">
                                Marca
                            </label>
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <InputRoot>
                                    <InputControl id="brand" type="text" placeholder='Huawei' {...register("brand")} />
                                </InputRoot>
                                <p className="text-xs text-red-500 font-semibold">{errors.brand?.message}</p>
                            </div>
                        </fieldset>

                        <fieldset className="mb-[15px] flex flex-col lg:flex-row lg:justify-between items-center gap-10">
                            <label className="text-sm" htmlFor="model">
                                Modelo
                            </label>
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <InputRoot>
                                    <InputControl id="model" type="text" placeholder='NE8000' {...register("model")} />
                                </InputRoot>
                                <p className="text-xs text-red-500 font-semibold">{errors.model?.message}</p>
                            </div>
                        </fieldset>



                    </div>

                    <div className="my-8 flex flex-col justify-center items-start gap-10">

                        <p>Selecione os clientes para vincular ao roteador:</p>

                        <div className='w-full grid grid-cols-2 gap-10'>
                            {allClients.map(client => {
                                return (
                                    <div className='relative col-span-2 lg:col-span-1 w-full h-8 flex justify-between items-center bg-emerald-500 rounded-lg px-3 py-4'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <User className='text-white' />
                                            <p className='text-white'>{client.name}</p>
                                        </div>
                                        <Checkbox.Root
                                            defaultChecked={routerToBeEdited?.clientsIds ? routerToBeEdited?.clientsIds.includes(client.id) : false}
                                            onCheckedChange={(checked) => addClientId(checked, client.id)}
                                            className="absolute right-3 flex h-5 w-5 appearance-none items-center justify-center rounded-[4px] bg-white "
                                            id="c1"
                                        >
                                            <Checkbox.Indicator className="text-zinc-950">
                                                <CheckIcon />
                                            </Checkbox.Indicator>
                                        </Checkbox.Root>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <Checkbox.Root
                            defaultChecked={routerToBeEdited ? routerToBeEdited.active! : false}
                            onCheckedChange={(checked) => setValue("active", Boolean(checked))}
                            className=" flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white dark:bg-zinc-800 shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
                            id="c1"
                        >
                            <Checkbox.Indicator className="text-emerald-500">
                                <CheckIcon />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label className="pl-[15px] text-[15px] leading-none dark:text-white" htmlFor="c1">
                            Ativo
                        </label>
                    </div>

                    <div className="mt-[25px] flex justify-end">
                        <Dialog.Close asChild>
                            <Button onClick={handleSubmit(routerToBeEdited ? updateRouter : createClient)}>Salvar</Button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button
                            onClick={() => {
                                setOpenCreateRouterDialog(false)
                                setRouterToBeEdited(null)
                            }}
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