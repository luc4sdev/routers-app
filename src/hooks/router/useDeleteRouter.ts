import { DeleteRouterUsecase } from '@/domain/use-cases/router/delete-router'
import { DeleteRouterService } from '@/services/router/deleteRouterService'
import { useMutation } from '@tanstack/react-query'

type DeleteRouterProps = DeleteRouterUsecase.Params

export async function deleteRouter({ id }: DeleteRouterProps) {

    const response = await DeleteRouterService.instance.perform({
        id
    })
    if (response instanceof Error) throw response

    return response

}

export function useDeleteRouter() {
    return useMutation({
        mutationKey: ['delete-router'],
        mutationFn: async (props: DeleteRouterProps) => deleteRouter(props),
    })
}