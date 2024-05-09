import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon, XIcon } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { InputControl, InputRoot } from '@/app/components/Form/Input';
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateClient } from '@/hooks/client/useCreateClient';
import { useQueryClient } from '@tanstack/react-query';
import { toastMessage } from '@/utils/helpers/toast-message';
import { useUpdateClient } from '@/hooks/client/useUpdateClient';
import { Client } from '@/domain/entities/client';
import { useGetAddress } from '@/hooks/address/useGetAddress';
import { useEffect } from 'react';
import { Address } from '@/domain/entities/address';

interface CreateClientDialogProps {
    openClientDialog: boolean
    clientToBeEdited: Client | null
    setOpenCreateClientDialog: (openDialog: boolean) => void
    setClientToBeEdited: (client: Client | null) => void
}

const AddressSchema = z.object({
    street: z.string().min(1, "Insira a rua"),
    number: z.string().min(1, "Insira o número"),
    cep: z.string().min(1, "Insira o cep"),
    neighborhood: z.string().min(1, "Insira o bairro"),
    city: z.string().min(1, "Insira a cidade"),
});

const createClientSchema = z.object({
    name: z.string().min(1, "Insira o nome"),
    document: z.string().min(11, "Insira o documento").max(14, 'O documento deve ser válido'),
    birthDate: z.string().min(1, "Insira a data de nascimemto"),
    address: AddressSchema,
    active: z.boolean().default(false)
})


type createClientSchema = z.infer<typeof createClientSchema>

export function CreateClientDialog({ openClientDialog, clientToBeEdited, setOpenCreateClientDialog, setClientToBeEdited }: CreateClientDialogProps) {

    const { data: addressData } = useGetAddress({ addressId: clientToBeEdited ? clientToBeEdited.addressId : '' })
    const { mutate: mutateCreateClient } = useCreateClient()
    const { mutate: mutateUpdateClient } = useUpdateClient()

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<createClientSchema>({
        resolver: zodResolver(createClientSchema)

    })
    const queryCLient = useQueryClient()

    function isNotError(value: any): value is Address {
        return !(value instanceof Error);
    }

    async function createClient(data: createClientSchema) {
        const type = data.document.length <= 11 ? 'FISICA' : 'JURIDICA'
        try {
            mutateCreateClient({
                name: data.name,
                type,
                document: data.document,
                birthDate: data.birthDate,
                address: {
                    street: data.address.street,
                    number: data.address.number,
                    cep: data.address.cep,
                    neighborhood: data.address.neighborhood,
                    city: data.address.city
                },
                active: data.active
            }, {
                onSuccess: () => {
                    queryCLient.invalidateQueries({
                        queryKey: ['get-all-clients'],
                        exact: false
                    })
                    toastMessage({
                        message: 'Cliente criado com sucesso!',
                        type: 'success'
                    })
                    reset()
                    setOpenCreateClientDialog(false)
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


    async function updateClient(data: createClientSchema) {
        const type = data.document.length <= 11 ? 'FISICA' : 'JURIDICA'
        console.log(data)
        try {
            mutateUpdateClient({
                id: clientToBeEdited ? clientToBeEdited.id : '',
                name: data.name,
                type,
                document: data.document,
                birthDate: data.birthDate,
                address: {
                    street: data.address.street,
                    number: data.address.number,
                    cep: data.address.cep,
                    neighborhood: data.address.neighborhood,
                    city: data.address.city
                },
                active: data.active
            }, {
                onSuccess: () => {
                    queryCLient.invalidateQueries({
                        queryKey: ['get-all-clients'],
                        exact: false
                    })
                    queryCLient.invalidateQueries({
                        queryKey: ['get-address'],
                        exact: false
                    })
                    toastMessage({
                        message: 'Cliente atualizado com sucesso!',
                        type: 'success'
                    })
                    reset()
                    setOpenCreateClientDialog(false)
                    setClientToBeEdited(null)

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
        if (clientToBeEdited) {

            if (addressData !== undefined && isNotError(addressData)) {
                setValue("name", clientToBeEdited.name)
                setValue("document", clientToBeEdited.document)
                setValue("birthDate", clientToBeEdited.birthDate)
                setValue("address.street", addressData.street)
                setValue("address.number", addressData.number)
                setValue("address.cep", addressData.cep)
                setValue("address.neighborhood", addressData.neighborhood)
                setValue("address.city", addressData.city)
                if (clientToBeEdited.active) {
                    setValue("active", clientToBeEdited.active)
                }
            }
        }
    }, [addressData])

    return (
        <Dialog.Root
            open={openClientDialog}
        >
            <Dialog.Trigger asChild>
                <Button onClick={() => setOpenCreateClientDialog(true)} className="w-auto md:w-36 xl:w-auto">Cadastrar Cliente</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="backdrop-blur-sm data-[state=open]: fixed inset-0" />
                <Dialog.Content className="overflow-y-scroll lg:overflow-y-hidden data-[state=open]: fixed top-[60%] lg:top-[50%] left-[50%] lg:left-[55%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-zinc-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-lg font-medium">
                        Cadastro
                    </Dialog.Title>
                    <Dialog.Description className="mt-[10px] mb-5 text-sm leading-normal">
                        Insira os dados do cliente.
                    </Dialog.Description>

                    <div className='flex flex-col lg:grid grid-cols-2 gap-3'>

                        <fieldset className="mb-[15px] flex flex-col lg:flex-row lg:justify-between items-center gap-10">
                            <label className="text-sm" htmlFor="name">
                                Nome
                            </label>
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <InputRoot>
                                    <InputControl id="name" type="text" placeholder='John Doe' {...register("name")} />
                                </InputRoot>
                                <p className="text-xs text-red-500 font-semibold">{errors.name?.message}</p>
                            </div>
                        </fieldset>

                        <fieldset className="mb-[15px] flex flex-col lg:flex-row lg:justify-between items-center gap-10">
                            <label className="text-sm" htmlFor="document">
                                CPF/CNPJ
                            </label>
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <InputRoot>
                                    <InputControl id="document" type="text" placeholder='000.000.000-00' {...register("document")} />
                                </InputRoot>
                                <p className="text-xs text-red-500 font-semibold">{errors.document?.message}</p>
                            </div>
                        </fieldset>


                        <fieldset className="mb-[15px] flex flex-col lg:flex-row lg:justify-between items-center gap-10">
                            <label className="text-sm" htmlFor="birthDate">
                                Data de nascimento
                            </label>
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <InputRoot>
                                    <InputControl className='' id="birthDate" type="date"  {...register("birthDate")} />
                                </InputRoot>
                                <p className="text-xs text-red-500 font-semibold">{errors.birthDate?.message}</p>
                            </div>
                        </fieldset>

                        <fieldset className="mb-[15px] flex flex-col lg:flex-row lg:justify-between items-center gap-10">
                            <label className="text-sm" htmlFor="street">
                                Rua
                            </label>
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <InputRoot>
                                    <InputControl id="street" type="text" placeholder='Rua abc' {...register("address.street")} />
                                </InputRoot>
                                <p className="text-xs text-red-500 font-semibold">{errors.address?.street?.message}</p>
                            </div>
                        </fieldset>

                        <fieldset className="mb-[15px] flex flex-col lg:flex-row lg:justify-between items-center gap-10">
                            <label className="text-sm" htmlFor="number">
                                Número
                            </label>
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <InputRoot>
                                    <InputControl id="number" type="text" placeholder='52' {...register("address.number")} />
                                </InputRoot>
                                <p className="text-xs text-red-500 font-semibold">{errors.address?.number?.message}</p>
                            </div>
                        </fieldset>

                        <fieldset className="mb-[15px] flex flex-col lg:flex-row lg:justify-between items-center gap-10">
                            <label className="text-sm" htmlFor="cep">
                                CEP
                            </label>
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <InputRoot>
                                    <InputControl id="cep" type="text" placeholder='71111-109' {...register("address.cep")} />
                                </InputRoot>
                                <p className="text-xs text-red-500 font-semibold">{errors.address?.cep?.message}</p>
                            </div>
                        </fieldset>

                        <fieldset className="mb-[15px] flex flex-col lg:flex-row lg:justify-between items-center gap-10">
                            <label className="text-sm" htmlFor="neighborhood">
                                Bairro
                            </label>
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <InputRoot>
                                    <InputControl id="neighborhood" type="text" placeholder='Bairro abc' {...register("address.neighborhood")} />
                                </InputRoot>
                                <p className="text-xs text-red-500 font-semibold">{errors.address?.neighborhood?.message}</p>
                            </div>
                        </fieldset>

                        <fieldset className="mb-[15px] flex flex-col lg:flex-row lg:justify-between items-center gap-10">
                            <label className="text-sm" htmlFor="city">
                                Cidade
                            </label>
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <InputRoot>
                                    <InputControl id="city" type="text" placeholder='Goiânia' {...register("address.city")} />
                                </InputRoot>
                                <p className="text-xs text-red-500 font-semibold">{errors.address?.city?.message}</p>
                            </div>
                        </fieldset>
                    </div>

                    <div className="flex items-center">
                        <Checkbox.Root
                            defaultChecked={clientToBeEdited ? clientToBeEdited.active! : false}
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
                            <Button onClick={handleSubmit(clientToBeEdited ? updateClient : createClient)}>Salvar</Button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button
                            onClick={() => {
                                setOpenCreateClientDialog(false)
                                setClientToBeEdited(null)
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