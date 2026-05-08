export interface Response<T> {
    data: T;
    success: boolean;
}

export interface ResponseArray<T> {
    data: T[];
    pagination: any;
    success: boolean;
}

export interface ResponseBarStats {
    data: {
        currentYear: number;
        previousYear: number;
        current: { bucket: number, label: string, count: number }[],
        previous: { bucket: number, label: string, count: number }[],
    }
}
