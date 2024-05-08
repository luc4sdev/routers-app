export interface DeleteClientUsecase {
    perform(params: DeleteClientUsecase.Params): Promise<DeleteClientUsecase.Response>
}

export namespace DeleteClientUsecase {
    export type Params = {
        id: string
    }

    export type Response = void | Error
}
