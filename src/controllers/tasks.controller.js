import { prisma } from "../db.js"

const GetAllTasksController = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const allTasks = await prisma.task.findMany({where: {userId: user.id}})
    res.json(allTasks)
  } catch(error) {
    console.error(error)
    res.status(500).json({ message: "Server error GetAllTasksController" });
  }
}

const GetTaskByIdController = async (req, res) => {
  try {
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
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Server error GetTaskByIdController" });
  }
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
    console.error(error);
    res.status(500).json({ message: "Server error CreateTaskController" });
  }
};

const DeleteTaskController = async (req, res) => {
  try {
    const taskDelete = await prisma.task.delete({where: {
      id: +req.params.id
    }})
    if (!taskDelete) return res.status(404).json({message: "Task not found"})
    return res.json(taskDelete)
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Server error DeleteTaskController" });
  }
}

const UpdateTaskController = async (req, res) => {
  try {
    const taskUpdate = await prisma.task.update({
      where: {
        id: +req.params.id
      },
      data: req.body
    })
    return res.json(taskUpdate)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error UpdateTaskController" });
  }
}

const CompletedTaskController = async (req, res) => {
  try {
    const taskUpdate = await prisma.task.update({
      where: {
        id: +req.params.id
      },
      data: {
        completed: true
      }
    })
    return res.json(taskUpdate)
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error CompletedTaskController" });
  }
}

export {
  GetAllTasksController,
  GetTaskByIdController,
  CreateTaskController,
  DeleteTaskController,
  UpdateTaskController,
  CompletedTaskController
}