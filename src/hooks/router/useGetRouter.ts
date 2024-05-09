import { GetRouterUseCase } from '@/domain/use-cases/router/get-router';
import { GetRouterService } from '@/services/router/getRouterService';
import { useQuery } from '@tanstack/react-query';

type GetRouterProps = GetRouterUseCase.Params;

export async function getRouter({ routerId }: GetRouterProps) {
    const response = await GetRouterService.instance.perform({
        routerId
    });
    return response;
}

export function useGetRouter({ routerId }: GetRouterProps) {
    return useQuery({
        queryKey: ['get-router', routerId],
        queryFn: async () => getRouter({ routerId }),
    });
}
