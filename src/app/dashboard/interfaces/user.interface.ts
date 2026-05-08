export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;

    isActive?: boolean;
    lastLoginAt?: string;
    createdAt?: string;
    updatedAt?: string;
}