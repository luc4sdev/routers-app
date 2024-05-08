import { Address } from "@/domain/entities/address"

export interface GetAddressUseCase {
    perform(params: GetAddressUseCase.Params): Promise<GetAddressUseCase.Response>
}

export namespace GetAddressUseCase {
    export type Params = {
        addressId: string
    }

    export type Response = Address | Error
}