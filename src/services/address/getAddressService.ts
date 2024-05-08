import { GetAddressUseCase } from "@/domain/use-cases/address/get-address"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class GetAddressService implements GetAddressUseCase {
    public static instance = new GetAddressService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: GetAddressUseCase.Params): Promise<GetAddressUseCase.Response> {

        const response = await this.requestHelper.make<GetAddressUseCase.Response>({
            url: `/address/${params.addressId}`,
            method: 'GET',
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}