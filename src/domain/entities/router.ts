export interface Router {
    id: string;
    ipAddress: string;
    ipv6Address: string;
    brand: string;
    model: string;
    active: boolean | null;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean | null;
    clientsIds?: string[]
}