import { Router } from "express";
import { getUsers, getUserById } from "../controllers/users.controller.ts";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);

export default router;