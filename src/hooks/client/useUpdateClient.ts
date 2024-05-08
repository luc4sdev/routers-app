import { UpdateClientUsecase } from '@/domain/use-cases/client/update-client'
import { UpdateClientService } from '@/services/client/updateClientService'
import { useMutation } from '@tanstack/react-query'

type UpdateClientProps = UpdateClientUsecase.Params

export async function updateClient({ id, name, type, document, birthDate, active, address }: UpdateClientProps) {

    const response = await UpdateClientService.instance.perform({
        id,
        name,
        type,
        document,
        birthDate,
        active,
        address
    })
    if (response instanceof Error) throw response

    return response

}

export function useUpdateClient() {
    return useMutation({
        mutationKey: ['update-client'],
        mutationFn: async (props: UpdateClientProps) => updateClient(props),
    })
}