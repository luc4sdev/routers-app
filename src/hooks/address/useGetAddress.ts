import { GetAddressUseCase } from '@/domain/use-cases/address/get-address'
import { GetAddressService } from '@/services/address/getAddressService'
import { useQuery } from '@tanstack/react-query'

type GetAddressProps = GetAddressUseCase.Params

export async function getAddress({ addressId }: GetAddressProps) {
    const response = await GetAddressService.instance.perform({
        addressId
    })
    return response
}

export function useGetAddress({ addressId }: GetAddressProps) {
    return useQuery({
        queryKey: ['get-address', addressId],
        queryFn: async () => getAddress({ addressId }),
    })
}