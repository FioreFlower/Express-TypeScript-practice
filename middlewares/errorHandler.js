import Logger from "./logger.js";

const notFoundHandler = (req, res) => {
    const response = {
        status: 404,
        message: "페이지를 찾을 수 없음",
        data: null,
    };
    Logger.warn(`${req.method} ${req.url}  ## ${JSON.stringify(response)}`);
    res.status(404).json(response);
};

const errorHandler = (err, req, res) => {
    Logger.error(err.stack);
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || "서버 오류",
        data: null,
    });
};


export {
    notFoundHandler,
    errorHandler
}