export interface ILog {
    id?: number;
    action: string;
    domain: string;
    domainId?: number;
    userId: number;
    userName: string;
    createdAt: string;
    updatedAt: string;
}
