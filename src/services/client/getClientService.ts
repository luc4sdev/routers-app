import { GetClientUseCase } from "@/domain/use-cases/client/get-client"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class GetClientService implements GetClientUseCase {
    public static instance = new GetClientService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: GetClientUseCase.Params): Promise<GetClientUseCase.Response> {

        const response = await this.requestHelper.make<GetClientUseCase.Response>({
            url: `/client/${params.clientId}`,
            method: 'GET',
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}