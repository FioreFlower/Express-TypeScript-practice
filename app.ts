import express from "express";
import Log from "./src/DEBUG/Utils/log.ts";
import router from "./src/routes/index.ts";

const app = express();

// 공통 미들웨어
app.use((req, _res, next) => {
    Log.info(`${req.method} ${req.url}`);
    next();
});

// 기본 라우터 연결
app.use("/", router);

export default app;