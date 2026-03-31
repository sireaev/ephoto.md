export interface IEvent {
    id?: number;
    title: string;
    description: string;
    eventDate: Date;
    status: string;
    categoryId: number;
    previewFileId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
