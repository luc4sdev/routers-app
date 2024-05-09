import { Client } from "@/domain/entities/client"

export interface GetRouterUseCase {
    perform(params: GetRouterUseCase.Params): Promise<GetRouterUseCase.Response>
}

export namespace GetRouterUseCase {
    export type Params = {
        routerId: string
    }

    export type Response = Client | Error
}