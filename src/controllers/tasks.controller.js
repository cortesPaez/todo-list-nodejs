import { prisma } from "../db.js"

const GetAllTasksController = async (req, res) => {
  try {
    const allTasks = await prisma.task.findMany()
    res.json(allTasks)
  } catch(error) {
    console.log(error)
  }
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
  try {
    const { title, description } = req.body;
    const { email } = req.user;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        userId: user.id
      }
    });

    res.json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating task" });
  }
};

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

const CompletedTaskController = async (req, res) => {
  const taskUpdate = await prisma.task.update({
    where: {
      id: +req.params.id
    },
    data: {
      completed: true
    }
  })

  return res.json(taskUpdate)
}

export {
  GetAllTasksController,
  GetTaskByIdController,
  CreateTaskController,
  DeleteTaskController,
  UpdateTaskController,
  CompletedTaskController
}