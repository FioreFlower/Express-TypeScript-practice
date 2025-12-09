import { Router } from "express";
import { getUsers, getUserById, postUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", postUser);

export default router;