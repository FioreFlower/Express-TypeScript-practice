import app from "./app.js";

const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
    if (process.env.NODE_ENV !== "production") {
        console.log(`\x1b[33m[DEBUG MODE]\x1b[0m Server started on ${HOST}:${PORT}`);
    } else {
        console.log(`Server started on ${HOST}:${PORT}`);
    }
});