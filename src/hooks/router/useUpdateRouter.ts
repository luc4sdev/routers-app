import { UpdateRouterUseCase } from '@/domain/use-cases/router/update-router'
import { UpdateRouterService } from '@/services/router/updateRouterService'
import { useMutation } from '@tanstack/react-query'

type UpdateRouterProps = UpdateRouterUseCase.Params

export async function updateRouter({ id, ipAddress, ipv6Address, brand, model, clientsIds }: UpdateRouterProps) {

    const response = await UpdateRouterService.instance.perform({
        id,
        ipAddress,
        ipv6Address,
        brand,
        model,
        clientsIds
    })
    if (response instanceof Error) throw response

    return response

}

export function useUpdateRouter() {
    return useMutation({
        mutationKey: ['update-router'],
        mutationFn: async (props: UpdateRouterProps) => updateRouter(props),
    })
}