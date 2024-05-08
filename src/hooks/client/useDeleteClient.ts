import { DeleteClientUsecase } from '@/domain/use-cases/client/delete-client'
import { DeleteClientService } from '@/services/client/deleteClientService'
import { useMutation } from '@tanstack/react-query'

type DeleteClientProps = DeleteClientUsecase.Params

export async function deleteClient({ id }: DeleteClientProps) {

    const response = await DeleteClientService.instance.perform({
        id
    })
    if (response instanceof Error) throw response

    return response

}

export function useDeleteClient() {
    return useMutation({
        mutationKey: ['delete-client'],
        mutationFn: async (props: DeleteClientProps) => deleteClient(props),
    })
}