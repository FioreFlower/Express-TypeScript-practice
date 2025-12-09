import { Router } from "express";
import usersRouter from "./users.router.js";
import postsRouter from "./posts.router.js";

const router = Router();

// root
// router.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// 세부 라우팅
router.use("/users", usersRouter);
router.use("/posts", postsRouter);

export default router;