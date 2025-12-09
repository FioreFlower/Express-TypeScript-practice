import { Router } from "express";
import { getPost } from "../controllers/posts.controller.js";

const router = Router();

router.get("/", getPost);

export default router;