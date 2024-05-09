export interface CreateRouterUsecase {
    perform(params: CreateRouterUsecase.Params): Promise<CreateRouterUsecase.Response>
}

export namespace CreateRouterUsecase {
    export type Params = {
        ipAddress: string;
        ipv6Address: string;
        brand: string;
        model: string;
        clientsIds: string[];
        active: boolean;
    }

    export type Response = void | Error
}
