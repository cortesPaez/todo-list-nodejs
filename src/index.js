import express from "express";
import cors from "cors"
import tasksRoutes from "./routes/tasks.routes.js"
import userRoutes from "./routes/user.routes.js"

const app = express()
const PORT = 3000

app.use(cors({
    origin: 'http://localhost:3001', // Cambia esto al dominio que necesites
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(tasksRoutes)
app.use(userRoutes)

app.listen(PORT, () => console.log(`Server on port ${PORT}`))
