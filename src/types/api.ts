export interface IUser {
    id: number;
    name: string;
    age: number;
}

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}