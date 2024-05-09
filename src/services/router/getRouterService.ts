import { GetRouterUseCase } from "@/domain/use-cases/router/get-router"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class GetRouterService implements GetRouterUseCase {
    public static instance = new GetRouterService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: GetRouterUseCase.Params): Promise<GetRouterUseCase.Response> {

        const response = await this.requestHelper.make<GetRouterUseCase.Response>({
            url: `/router/${params.routerId}`,
            method: 'GET',
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}