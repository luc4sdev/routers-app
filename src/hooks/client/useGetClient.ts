import { GetClientUseCase } from '@/domain/use-cases/client/get-client';
import { GetClientService } from '@/services/client/getClientService';
import { useQuery } from '@tanstack/react-query';

type GetClientProps = GetClientUseCase.Params;

export async function getClient({ clientId }: GetClientProps) {
    const response = await GetClientService.instance.perform({
        clientId
    });
    return response;
}

export function useGetClient(clientIds: string[]) {
    return useQuery({
        queryKey: ['get-clients', clientIds],
        queryFn: async () => {
            const clientPromises = clientIds.map(clientId => getClient({ clientId }));
            const clients = await Promise.all(clientPromises);
            return clients;
        },
    });
}
