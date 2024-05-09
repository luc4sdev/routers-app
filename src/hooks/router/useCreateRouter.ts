
import { CreateRouterUsecase } from '@/domain/use-cases/router/create-router'
import { CreateRouterService } from '@/services/router/createRouterService'
import { useMutation } from '@tanstack/react-query'

type CreateRouterProps = CreateRouterUsecase.Params

export async function createRouter({ ipAddress, ipv6Address, brand, model, clientsIds }: CreateRouterProps) {

    const response = await CreateRouterService.instance.perform({
        ipAddress,
        ipv6Address,
        brand,
        model,
        clientsIds
    })
    if (response instanceof Error) throw response

    return response

}

export function useCreateRouter() {
    return useMutation({
        mutationKey: ['create-router'],
        mutationFn: async (props: CreateRouterProps) => createRouter(props),
    })
}