import { prisma } from "../db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return res.json({message: "successful", email: newUser.email});
  } catch (error) {
    console.error(error);
    res.status(500).json({
        message: "Server error",
    });
  }
};

const LoginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ message: "Missing required fields" });
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) return res.json({ message: "user not found" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid password" });
    }

    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ message: "successful", token: token });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "server with problems", token: token });
  }
};

export { RegisterUserController, LoginUserController };
