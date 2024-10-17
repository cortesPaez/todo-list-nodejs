import { Router } from "express";
import { LoginUserController, RegisterUserController } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", RegisterUserController);
router.post("/login", LoginUserController);

export default router;
