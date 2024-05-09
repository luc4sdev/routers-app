import { Router } from "@/domain/entities/router";

export interface UpdateRouterUseCase {
    perform(params: UpdateRouterUseCase.Params): Promise<UpdateRouterUseCase.Response>
}

export namespace UpdateRouterUseCase {
    export type Params = {
        id: string;
        ipAddress?: string;
        ipv6Address?: string;
        brand?: string;
        model?: string;
        clientsIds?: string[];
    }

    export type Response = Router | Error
}
