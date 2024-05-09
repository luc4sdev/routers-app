import { CreateRouterUsecase } from "@/domain/use-cases/router/create-router"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class CreateRouterService implements CreateRouterUsecase {
    public static instance = new CreateRouterService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: CreateRouterUsecase.Params): Promise<CreateRouterUsecase.Response> {
        const response = await this.requestHelper.make<CreateRouterUsecase.Response>({
            url: '/router',
            method: 'POST',
            data: params
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}