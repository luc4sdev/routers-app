import { UpdateClientUseCase } from "@/domain/use-cases/client/update-client"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class UpdateClientService implements UpdateClientUseCase {
    public static instance = new UpdateClientService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: UpdateClientUseCase.Params): Promise<UpdateClientUseCase.Response> {
        const response = await this.requestHelper.make<UpdateClientUseCase.Response>({
            url: '/update-client',
            method: 'PUT',
            data: params
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}