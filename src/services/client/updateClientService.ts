import { UpdateClientUsecase } from "@/domain/use-cases/client/update-client"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class UpdateClientService implements UpdateClientUsecase {
    public static instance = new UpdateClientService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: UpdateClientUsecase.Params): Promise<UpdateClientUsecase.Response> {
        const response = await this.requestHelper.make<UpdateClientUsecase.Response>({
            url: '/update-client',
            method: 'PUT',
            data: params
        })
        if ('error' in response) {
            return response.error
        }

        return
    }
}