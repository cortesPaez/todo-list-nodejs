import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]

  if (!token) return res.status(401).json({error: "token not provided"})
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET)
		req.user = {email}
		next()
  }catch (error) {
		console.error(error)
		return json.status(400).json({message: "Invalid token"})
  }
}