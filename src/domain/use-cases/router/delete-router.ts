import { Router } from "@/domain/entities/router"

export interface DeleteRouterUsecase {
    perform(params: DeleteRouterUsecase.Params): Promise<DeleteRouterUsecase.Response>
}

export namespace DeleteRouterUsecase {
    export type Params = {
        id: string
    }

    export type Response = Router | Error
}
