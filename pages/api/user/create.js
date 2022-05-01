import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { username, email, password } = req.body;

  try {
    await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    res.status(200).json({ message: "User successfully created" });
  } catch (e) {
    console.log("Attempt unsuccessful:", e);
  }
}
