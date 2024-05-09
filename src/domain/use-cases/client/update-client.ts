import { Client } from "@/domain/entities/client";

export interface UpdateClientUseCase {
    perform(params: UpdateClientUseCase.Params): Promise<UpdateClientUseCase.Response>
}

export namespace UpdateClientUseCase {
    export type Params = {
        id: string;
        name?: string;
        type?: 'FISICA' | 'JURIDICA';
        document?: string;
        birthDate?: string;
        address?: {
            street?: string;
            number?: string;
            cep?: string;
            neighborhood?: string;
            city?: string;
        };
    }

    export type Response = Client | Error
}
