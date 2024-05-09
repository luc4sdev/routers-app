import { CreateClientUsecase } from "@/domain/use-cases/client/create-client"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class CreateClientService implements CreateClientUsecase {
    public static instance = new CreateClientService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: CreateClientUsecase.Params): Promise<CreateClientUsecase.Response> {
        const response = await this.requestHelper.make<CreateClientUsecase.Response>({
            url: '/client',
            method: 'POST',
            data: params
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}