import app from "../app.ts";
import Log from "./DEBUG/Utils/log.ts";

const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
    Log.info(`Server started on ${HOST}:${PORT}`);
});