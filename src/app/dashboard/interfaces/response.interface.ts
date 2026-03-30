export interface Response<T> {
    data: T;
    success: boolean;
}

export interface ResponseArray<T> {
    data: T[];
    pagination: any;
    success: boolean;
}