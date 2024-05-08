import { GetAllClientsService } from '@/services/client/getAllClientsService'
import { useQuery } from '@tanstack/react-query'

export async function getAllClients() {
  const response = await GetAllClientsService.instance.perform()
  return response
}

export function useGetAllClients() {
  return useQuery({
    queryKey: ['get-all-clients'],
    queryFn: () => getAllClients(),
  })
}