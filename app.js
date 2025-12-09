import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import router from "./routes/.index.router.js";
import { regResLogger } from "./middlewares/logger.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);  // 현재 파일 경로
const __dirname = path.dirname(__filename);         // 현재 디렉토리 경로

const app = express();

app.set("view engine", "hbs"); // 특정 엔진을 템플릿 엔진으로 사용하기 위한 설정
app.set("views", path.join(__dirname, "views")); // view 파일들이 모여있는 폴더를 명시

app.get("/", (_req, res) => {
    res.render("index", {
        imageTitle: "It is HOLO. She is Very Cute!"
    });
});

// 정적 파일
app.use('/static',express.static(path.join(__dirname, "public")));
app.use(express.json());

// 공통 미들웨어
app.use(regResLogger);

// router
app.use("/", router);   // 기본 라우터 연결

// 404 핸들러
app.use(notFoundHandler);

// 에러 핸들러
app.use(errorHandler);

export default app;