import { Client } from "@/domain/entities/client"

export interface GetClientUseCase {
    perform(params: GetClientUseCase.Params): Promise<GetClientUseCase.Response>
}

export namespace GetClientUseCase {
    export type Params = {
        clientId: string
    }

    export type Response = Client | Error
}