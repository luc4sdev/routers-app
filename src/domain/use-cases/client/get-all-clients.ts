import { Client } from "@/domain/entities/client"

export interface GetAllClientsUseCase {
    perform(): Promise<GetAllClientsUseCase.Response>
}

export namespace GetAllClientsUseCase {
    export type Response = Client[] | Error
}