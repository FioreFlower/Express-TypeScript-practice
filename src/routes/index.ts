import { Router } from "express";
import usersRouter from "./users.ts";
import Log from "../DEBUG/Utils/log.ts";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

// /users
router.use("/users", usersRouter);

export default router;