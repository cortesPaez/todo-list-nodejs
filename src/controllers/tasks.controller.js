import { prisma } from "../db.js"

const GetAllTasksController = async (req, res) => {
  const allTasks = await prisma.task.findMany()
  res.json(allTasks)
}

const GetTaskByIdController = async (req, res) => {
  const taskById = await prisma.task.findFirst({
    where: {
      id: +req.params.id
    }
  })
  if (!taskById) return res.status(404).json({data: {
    message: "Task not found",
    code: 404
  }})
  return res.json(taskById)
}

const CreateTaskController = async (req, res) => {
  const newTask = await prisma.task.create({
    data: req.body
  })
  res.json(newTask)
}

const DeleteTaskController = async (req, res) => {
  const taskDelete = await prisma.task.delete({where: {
    id: +req.params.id
  }})
  if (!taskDelete) return res.status(404).json({data: {message: "Product not found", code: 404}})
  return res.json(taskDelete)
}

const UpdateTaskController = async (req, res) => {
  const taskUpdate = await prisma.task.update({
    where: {
      id: +req.params.id
    },
    data: req.body
  })

  return res.json(taskUpdate)
}

export {
  GetAllTasksController,
  GetTaskByIdController,
  CreateTaskController,
  DeleteTaskController,
  UpdateTaskController
}