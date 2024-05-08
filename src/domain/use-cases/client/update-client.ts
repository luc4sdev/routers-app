export interface UpdateClientUsecase {
    perform(params: UpdateClientUsecase.Params): Promise<UpdateClientUsecase.Response>
}

export namespace UpdateClientUsecase {
    export type Params = {
        id: string;
        name?: string;
        type?: 'FISICA' | 'JURIDICA';
        document?: string;
        birthDate?: string;
        active?: boolean;
        address?: {
            street?: string;
            number?: string;
            cep?: string;
            neighborhood?: string;
            city?: string;
        };
    }

    export type Response = void | Error
}