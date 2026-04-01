import { IEventFile } from "./event-file.interface";

export interface IEvent {
    id?: number;
    title: string;
    description: string;
    eventDate: Date | string;
    status: string;
    categoryId: number;
    previewFileId: number;
    createdAt?: Date;
    updatedAt?: Date;

    files?: IEventFile[];
}
