import express from "express";
import Log from "./DEBUG/Utils/log.ts";
import router from "./routes/index.ts";
import {ApiResponse} from "./types/api.ts";

const app = express();

// 공통 미들웨어
app.use((req, _res, next) => {
    Log.info(`${req.method} ${req.url}`);
    next();
});

// 기본 라우터 연결
app.use("/", router);


// ----------- 404 핸들러 -----------
app.use((req, res, _next) => {

    const response: ApiResponse<null> = {
        status: 404,
        message: "페이지를 찾을 수 없음",
        data: null,
    };
    Log.warn(`${req.method} ${req.url}  ## ${JSON.stringify(response)}`);
    res.status(404).json(response);
});


export default app;