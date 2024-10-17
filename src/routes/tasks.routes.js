import { Router } from "express";
import { verifyToken } from "../middlewares/jwt.middleware.js";
import { CompletedTaskController, CreateTaskController, DeleteTaskController, GetAllTasksController, GetTaskByIdController, UpdateTaskController } from "../controllers/tasks.controller.js";

const router = Router();

router.get("/tasks", verifyToken, GetAllTasksController)
router.get("/tasks/:id", verifyToken, GetTaskByIdController)
router.post("/tasks", verifyToken, CreateTaskController)
router.delete("/tasks/:id", verifyToken, DeleteTaskController)
router.put("/tasks/:id", verifyToken, UpdateTaskController)
router.patch("/tasks/:id/completed", verifyToken, CompletedTaskController)

export default router