import { Router } from "@/domain/entities/router"

export interface GetRouterUseCase {
    perform(params: GetRouterUseCase.Params): Promise<GetRouterUseCase.Response>
}

export namespace GetRouterUseCase {
    export type Params = {
        routerId: string
    }

    export type Response = Router | Error
}