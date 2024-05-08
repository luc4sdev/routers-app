export interface CreateClientUsecase {
    perform(params: CreateClientUsecase.Params): Promise<CreateClientUsecase.Response>
}

export namespace CreateClientUsecase {
    export type Params = {
        name: string;
        type: 'FISICA' | 'JURIDICA';
        document: string;
        birthDate: string;
        active: boolean;
        address: {
            street: string;
            number: string;
            cep: string;
            neighborhood: string;
            city: string;
        };
    }

    export type Response = void | Error
}
