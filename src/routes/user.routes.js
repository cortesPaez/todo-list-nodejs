import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();
const prisma = new PrismaClient()

router.get("/user", async (req, res) => {
  res.send("users")
})

export default router