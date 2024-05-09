import { DeleteClientUsecase } from "@/domain/use-cases/client/delete-client"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class DeleteClientService implements DeleteClientUsecase {
    public static instance = new DeleteClientService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: DeleteClientUsecase.Params): Promise<DeleteClientUsecase.Response> {
        const response = await this.requestHelper.make<DeleteClientUsecase.Response>({
            url: '/delete-client',
            method: 'PUT',
            data: params
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}