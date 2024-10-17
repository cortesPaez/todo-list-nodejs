import { Router } from "express";
import { RegisterUserController } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", RegisterUserController);

export default router;
