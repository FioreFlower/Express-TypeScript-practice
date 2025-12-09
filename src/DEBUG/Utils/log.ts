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
type LogLevel = "INFO" | "WARN" | "ERROR";
const isDebug = process.env.NODE_ENV !== "production";


// ──────────────────────────────────────────────
// 유틸 함수
// ──────────────────────────────────────────────
const getTimestamp = () => dayjs().format("YYYY-MM-DD HH:mm:ss");

const shouldWriteToFile = (level: LogLevel) => {
    // 개발 모드 → 모든 로그 기록
    if (isDebug) return true;

    // 운영 모드 → WARN, ERROR만 기록
    return level === "ERROR" || level === "WARN";
};

const getLogFilePath = () => {
    const date = dayjs().format("YYYY-MM-DD");
    return path.join(__dirname, `logs/log_${date}.log`);
};

const colorize = (level: LogLevel, text: string) => {
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
const write = (level: LogLevel, message: string) => {
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

// ──────────────────────────────────────────────
// 외부에서 사용하는 API
// ──────────────────────────────────────────────
const Log = {
    info: (msg: string) => write("INFO", msg),
    warn: (msg: string) => write("WARN", msg),
    error: (msg: string) => write("ERROR", msg),
};

export default Log;