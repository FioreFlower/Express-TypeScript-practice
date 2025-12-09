import { Request, Response } from "express";
import { ApiResponse, IUser } from "../types/api.js";

const Users: IUser[] = [
    { id: 1, name: "John", age: 18 },
    { id: 2, name: "han", age: 18 },
];

export const getUsers = (_req: Request, res: Response) => {
    const response: ApiResponse<IUser[]> = {
        status: 200,
        message: "데이터 조회 성공",
        data: Users,
    };

    res.json(response);
};

export const getUserById = (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const user = Users.find(u => u.id === userId);

    if (!user) {
        const response: ApiResponse<null> = {
            status: 404,
            message: "데이터를 찾을 수 없음",
            data: null,
        };
        return res.status(404).json(response);
    }

    const response: ApiResponse<IUser> = {
        status: 200,
        message: "데이터 조회 성공",
        data: user,
    };

    res.json(response);
};