import app from "./src/app.ts";

const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
    console.log(`Server started on ${HOST}:${PORT}`);
});