import * as Dialog from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
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
import { useEffect, useState } from 'react';
import { Address } from '@/domain/entities/address';
import InputMask from 'react-input-mask'
import { dynamicMask } from '@/utils/helpers/dynamic-document-mask';

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
    document: z.string().min(14, "Insira o documento").max(18, 'O documento deve ser válido'),
    birthDate: z.string().min(1, "Insira a data de nascimemto"),
    address: AddressSchema
})

type createClientSchema = z.infer<typeof createClientSchema>

export function CreateClientDialog({ openClientDialog, clientToBeEdited, setOpenCreateClientDialog, setClientToBeEdited }: CreateClientDialogProps) {

    const [documentValue, setDocumentValue] = useState('')

    const { data: addressData } = useGetAddress({ addressId: clientToBeEdited ? clientToBeEdited.addressId : '' })
    const { mutate: mutateCreateClient, isPending: isPendingCreateClient } = useCreateClient()
    const { mutate: mutateUpdateClient, isPending: isPendingUpdateClient } = useUpdateClient()

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<createClientSchema>({
        resolver: zodResolver(createClientSchema),
        defaultValues: {
            name: '',
            document: '',
            birthDate: '',
            address: {
                street: '',
                cep: '',
                number: '',
                neighborhood: '',
                city: ''
            }

        }

    })
    const queryCLient = useQueryClient()

    function isNotError(value: any): value is Address {
        return !(value instanceof Error);
    }

    async function createClient(data: createClientSchema) {

        const type = data.document.length <= 14 ? 'FISICA' : 'JURIDICA'
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
                }
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
                    toastMessage({
                        message: error.message,
                        type: 'error'
                    })
                }
            })

        } catch (error: any) {
            return console.error(error.message)
        }
    }


    async function updateClient(data: createClientSchema) {
        const type = data.document.length <= 14 ? 'FISICA' : 'JURIDICA'

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
                }
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
                    toastMessage({
                        message: error.message,
                        type: 'error'
                    })
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

                setDocumentValue(clientToBeEdited.document)
            }
        }
    }, [addressData])


    useEffect(() => {
        setValue('document', documentValue)
    }, [documentValue])


    return (
        <Dialog.Root
            open={openClientDialog}
        >
            <Dialog.Trigger asChild>
                <Button onClick={() => setOpenCreateClientDialog(true)} className="w-auto md:w-36 xl:w-auto">Cadastrar Cliente</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="backdrop-blur-sm fixed inset-0" />
                <Dialog.Content className="overflow-y-scroll scrollbar-hide fixed top-[60%] lg:top-[50%] left-[50%] lg:left-[65%] xl:left-[55%] max-h-[60vh] lg:max-h-[80vh] w-11/12 lg:w-[70vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-zinc-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
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
                                    <InputMask
                                        className='flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none dark:placeholder-zinc-400 dark:text-zinc-100'
                                        mask={dynamicMask(documentValue)}
                                        maskChar=""
                                        value={documentValue}
                                        onChange={(e) => setDocumentValue(e.target.value)}
                                        placeholder="CPF ou CNPJ"
                                    />
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
                                    <InputControl style={{ background: 'none', width: '100%' }} id="birthDate" type="date"  {...register("birthDate")} />
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
                                    <InputControl id="street" type="text" placeholder='Av Rio Branco' {...register("address.street")} />
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
                                    <InputControl id="number" type="number" placeholder='52' {...register("address.number")} />
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
                                    <InputMask
                                        id='cep'
                                        className='flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none dark:placeholder-zinc-400 dark:text-zinc-100'
                                        {...register('address.cep')}
                                        mask="99999-999"
                                        maskChar=""
                                        placeholder="CEP"
                                    />
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
                                    <InputControl id="neighborhood" type="text" placeholder='Vila João Vaz' {...register("address.neighborhood")} />
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

                    <div className="mt-[25px] flex justify-end">
                        <Dialog.Close asChild>
                            <Button onClick={handleSubmit(clientToBeEdited ? updateClient : createClient)}>
                                {isPendingCreateClient || isPendingUpdateClient ? (
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-200/40 animate-spin  fill-gray-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>

                                ) :
                                    (
                                        <span>Salvar</span>
                                    )}
                            </Button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button
                            onClick={() => {
                                setOpenCreateClientDialog(false)
                                setClientToBeEdited(null)
                                reset()
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