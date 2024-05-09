import { Router } from "@/domain/entities/router"

export interface GetAllRoutersUseCase {
    perform(): Promise<GetAllRoutersUseCase.Response>
}

export namespace GetAllRoutersUseCase {
    export type Response = Router[] | Error
}