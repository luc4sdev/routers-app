import { GetAllClientsUseCase } from "@/domain/use-cases/client/get-all-clients"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class GetAllClientsService implements GetAllClientsUseCase {
    public static instance = new GetAllClientsService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(): Promise<GetAllClientsUseCase.Response> {
        const response = await this.requestHelper.make<GetAllClientsUseCase.Response>({
            url: '/get-clients',
            method: 'GET',
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}