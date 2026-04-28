import { IEvent } from "./event.interface";
import { IUser } from "./user.interface";

export interface IEventFile {
    id: number;
    eventId: number;
    type: string;
    event?: IEvent;
    webUrl: string;
    mobileUrl: string;
    mimeType: string;
    size: number; // bytes
    width: number;
    height: number;
    uploadedBy: IUser;
    previewForEvents?: IEvent[];

    createdAt?: string;
    updatedAt?: string;
}
