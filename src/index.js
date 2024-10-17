import express from "express";
import tasksRoutes from "./routes/tasks.routes.js"

const app = express()
const PORT = 3000

app.use(express.json())

app.use("/api", tasksRoutes)

app.listen(PORT, () => console.log(`Server on port ${PORT}`))
