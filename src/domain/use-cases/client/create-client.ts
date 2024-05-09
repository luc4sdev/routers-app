import { Client } from "@/domain/entities/client";

export interface CreateClientUsecase {
    perform(params: CreateClientUsecase.Params): Promise<CreateClientUsecase.Response>
}

export namespace CreateClientUsecase {
    export type Params = {
        name: string;
        type: 'FISICA' | 'JURIDICA';
        document: string;
        birthDate: string;
        address: {
            street: string;
            number: string;
            cep: string;
            neighborhood: string;
            city: string;
        };
    }

    export type Response = Client | Error
}
