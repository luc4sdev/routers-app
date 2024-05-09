import { DeleteRouterUsecase } from "@/domain/use-cases/router/delete-router"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class DeleteRouterService implements DeleteRouterUsecase {
    public static instance = new DeleteRouterService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: DeleteRouterUsecase.Params): Promise<DeleteRouterUsecase.Response> {
        const response = await this.requestHelper.make<DeleteRouterUsecase.Response>({
            url: '/delete-router',
            method: 'PUT',
            data: params
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}