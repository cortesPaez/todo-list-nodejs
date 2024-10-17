import { prisma } from "../db.js";
import bcryptjs from "bcryptjs"

const RegisterUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ ok: false, message: "Missing required" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(409).json({ message: "email already exist" });
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = await prisma.user.create({ data: {email, password: hashedPassword} });

    return res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: {
        message: "Server error",
        code: 500,
      },
    });
  }
};

export { RegisterUserController };
