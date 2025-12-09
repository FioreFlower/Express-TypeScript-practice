import Logger from "../middlewares/logger.js";
import Model  from "../models/users.model.js";

// ──────────────────────────────────────────────
// 외부에서호출될 API 함수
// ──────────────────────────────────────────────
const getUsers = (_req, res) => {

    const response = {
        status: 200,
        message: "데이터 조회 성공",
        data: Model,
    };

    Logger.info(`status : [${response.status}] message : [${response.message}] data : [${JSON.stringify(response.data)}]`);

    res.json(response);
};

const getUserById = (req, res) => {

    try{

        const userId = Number(req.params.userId);
        const user = Model.find(u => u.id === userId) || null;

        if (!user) {
            const response = {
                status: 404,
                message: "데이터를 찾을 수 없음",
                data: null
            };

            responseLogWarn(response);

            return res.status(response.status).json(response);

        }

        const response = {
            status: 200,
            message: "데이터 조회 성공",
            data: user
        };

        responseLogInfo(response);

        res.status(response.status).json(response);

    } catch (e) {
        const response = {
            status: 500,
            message: "서버 내부 오류",
            data: e
        };

        responseLogError(response);

        return res.status(response.status).json(response);
    }

};

const postUser = (req, res) => {
    console.log(`req.body: ${JSON.stringify(req.body)}`);
    if(!req.body.name) {
        const response = {
            status: 400,
            message: "요청이 올바르지 않음",
            data: null,
        };

        return res.status(response.status).json({response})

    }
    try {
        const newUser = { name: req.body.name, id: Model.length }

        Model.push(newUser);

        const response = {
            status: 201,
            message: "데이터 조회 성공",
            data: Model,
        };

        responseLogInfo(response);

        return res.status(response.status).json(response);

    } catch (e){
        const response = {
            status: 500,
            message: "서버 내부 오류",
            data: e
        };

        responseLogError(response);

        return res.status(response.status).json(response);
    }


}



// ──────────────────────────────────────────────
// 유틸 함수
// ──────────────────────────────────────────────
const responseLogWarn = (response) =>
    Logger.warn(`status : [${response.status}] message : [${response.message}] data : [${JSON.stringify(response.data)}]`);

const responseLogInfo = (response) =>
    Logger.info(`status : [${response.status}] message : [${response.message}] data : [${JSON.stringify(response.data)}]`);

const responseLogError = (response) =>
    Logger.error(`status : [${response.status}] message : [${response.message}] data : [${JSON.stringify(response.data)}]`);


export {
    postUser,
    getUsers,
    getUserById,
}