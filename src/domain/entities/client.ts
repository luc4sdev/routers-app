export interface Client {
    id: string;
    name: string;
    type: 'FISICA' | 'JURIDICA';
    document: string;
    birthDate: string;
    active: boolean | null;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean | null;
    addressId: string;
    routerId: string | null;
}