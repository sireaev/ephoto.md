export interface IReview {
    id?: number;
    clientId?: number;
    categoryId: number;
    name: string;
    message: string;
    rating?: number;
    status: string;
    moderationReason?: string;
    createdAt?: string;
    updatedAt?: string;
}