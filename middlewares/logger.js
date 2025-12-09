import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dayjs from "dayjs";

// ──────────────────────────────────────────────
// 경로 설정
// ──────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ──────────────────────────────────────────────
// 환경 설정
// ──────────────────────────────────────────────
const isDebug = process.env.NODE_ENV !== "production";


// ──────────────────────────────────────────────
// 유틸 함수
// ──────────────────────────────────────────────
const getTimestamp = () => dayjs().format("YYYY-MM-DD HH:mm:ss");

const shouldWriteToFile = (level) => {
    // 개발 모드 → 모든 로그 기록
    if (isDebug) return true;

    // 운영 모드 → WARN, ERROR만 기록
    return level === "ERROR" || level === "WARN";
};

const getLogFilePath = () => {
    const date = dayjs().format("YYYY-MM-DD");
    return path.join(__dirname, `logs/log_${date}.log`);
};

const colorize = (level, text) => {
    switch (level) {
        case "INFO":
            return `\x1b[34m${text}\x1b[0m`; // 초록
        case "WARN":
            return `\x1b[33m${text}\x1b[0m`; // 노랑
        case "ERROR":
            return `\x1b[31m${text}\x1b[0m`; // 빨강
        default:
            return text;
    }
};


// ──────────────────────────────────────────────
// 내부 로깅 처리 함수
// ──────────────────────────────────────────────
const write = (level, message) => {
    const time = getTimestamp();
    const log = `[${level}] ${time} - ${message}\n`;

    // 콘솔 출력
    console.log(colorize(level,log.trim()));

    // 파일 저장
    if (shouldWriteToFile(level)) {
        const todayLog = getLogFilePath();
        const logDir = path.dirname(todayLog);

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        fs.appendFile(todayLog, log, (err) => {
            if (err) console.error("로그 파일 저장 실패:", err);
        });
    }
};

export const regResLogger = (req, res, next) => {
    const start = Date.now();
    console.log(`start : ${req.method} ${req.url}`);

    // 응답이 끝난 후에 로그
    res.on("finish", () => {
        const diffTime = Date.now() - start;
        console.log(`end : ${req.method} ${req.originalUrl} ${diffTime}ms`);
    });

    next();
};

// ──────────────────────────────────────────────
// 외부에서 사용하는 API
// ──────────────────────────────────────────────
const Logger = {
    info: (msg) => write("INFO", msg),
    warn: (msg) => write("WARN", msg),
    error: (msg) => write("ERROR", msg),
};

export default Logger;