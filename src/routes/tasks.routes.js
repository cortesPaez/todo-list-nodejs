import { Router } from "express";
import { CreateTaskController, DeleteTaskController, GetAllTasksController, GetTaskByIdController, UpdateTaskController } from "../controllers/tasks.controller.js";

const router = Router();

router.get("/tasks", GetAllTasksController)

router.get("/tasks/:id", GetTaskByIdController)

router.post("/tasks", CreateTaskController)

router.delete("/tasks/:id", DeleteTaskController)

router.put("/tasks/:id", UpdateTaskController)

export default router