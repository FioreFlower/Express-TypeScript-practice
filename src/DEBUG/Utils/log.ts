import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFile = path.join(__dirname, "app.log");

type LogLevel = "INFO" | "WARN" | "ERROR";

const write = (level:LogLevel, message: string) => {
    const time = getTimestamp();
    const log = `[${level}] ${time} - ${message}\n`;

    // 콘솔 출력
    console.log(log.trim());

    // 파일 저장
    fs.appendFile(logFile, log, (err: NodeJS.ErrnoException | null) => {
        if (err) console.error("로그 파일 저장 실패:", err);
    });
};

const Log = {
    info: (msg: string) => write("INFO", msg),
    warn: (msg: string) => write("WARN", msg),
    error: (msg: string) => write("ERROR", msg),
};

function getTimestamp() {
    const now = new Date();

    return (
        `${now.getFullYear()}-` +
        `${String(now.getMonth() + 1).padStart(2, "0")}-` +
        `${String(now.getDate()).padStart(2, "0")} ` +
        `${String(now.getHours()).padStart(2, "0")}:` +
        `${String(now.getMinutes()).padStart(2, "0")}:` +
        `${String(now.getSeconds()).padStart(2, "0")}`
    );
}

export type LogType = typeof Log;  // ← 타입만 따로 내보내기
export default Log;