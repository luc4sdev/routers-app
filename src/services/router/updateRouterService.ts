import { UpdateRouterUseCase } from "@/domain/use-cases/router/update-router"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class UpdateRouterService implements UpdateRouterUseCase {
    public static instance = new UpdateRouterService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: UpdateRouterUseCase.Params): Promise<UpdateRouterUseCase.Response> {
        const response = await this.requestHelper.make<UpdateRouterUseCase.Response>({
            url: '/update-router',
            method: 'PUT',
            data: params
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}