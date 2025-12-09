import { Request, Response } from "express";
import { ApiResponse, IUser } from "../types/api.ts";
import Log from "../DEBUG/Utils/log.ts";

// MOCK DATA
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
    Log.info(`status : [${response.status}] message : [${response.message}] data : [${JSON.stringify(response.data)}]`);
    res.json(response);
};



export const getUserById = (req: Request, res: Response) => {

    try{

        const userId = Number(req.params.userId);
        const user = Users.find(u => u.id === userId);

        if (!user) {
            const response: ApiResponse<null> = {
                status: 404,
                message: "데이터를 찾을 수 없음",
                data: null,
            };
            LogWarn(response);
            return res.status(response.status).json(response);
        }

        const response: ApiResponse<IUser> = {
            status: 200,
            message: "데이터 조회 성공",
            data: user,
        };
        LogInfo(response);
        res.status(response.status).json(response);
    } catch (e) {
        LogError(e);
        return res.status(500).json({
            status: 500,
            message: "서버 내부 오류",
            data: null,
        });
    }

};

const LogWarn = (response: ApiResponse<IUser|null>)=> {
    Log.warn(`status : [${response.status}] message : [${response.message}] data : [${JSON.stringify(response.data)}]`);
}

const LogInfo = (response: ApiResponse<IUser>)=> {
    Log.info(`status : [${response.status}] message : [${response.message}] data : [${JSON.stringify(response.data)}]`);
}

const LogError = (e:any )=> {
    Log.error(`[${e}]`);
}