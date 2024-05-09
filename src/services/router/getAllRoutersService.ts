import { GetAllRoutersUseCase } from "@/domain/use-cases/router/get-all-routers"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class GetAllRoutersService implements GetAllRoutersUseCase {
    public static instance = new GetAllRoutersService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(): Promise<GetAllRoutersUseCase.Response> {
        const response = await this.requestHelper.make<GetAllRoutersUseCase.Response>({
            url: '/get-routers',
            method: 'GET',
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}