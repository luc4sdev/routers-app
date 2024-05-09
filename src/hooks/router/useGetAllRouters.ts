import { GetAllRoutersService } from '@/services/router/getAllRoutersService'
import { useQuery } from '@tanstack/react-query'

export async function getAllRouters() {
    const response = await GetAllRoutersService.instance.perform()
    return response
}

export function useGetAllRouters() {
    return useQuery({
        queryKey: ['get-all-routers'],
        queryFn: () => getAllRouters(),
    })
}