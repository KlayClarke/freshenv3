import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { user } = session;
  const { id } = req.query;

  let salon = await prisma.salon.findUnique({
    where: {
      id,
    },
  });

  if (req.method === "POST" && session && user.id === salon.author_id) {
    try {
      const salon = await prisma.salon.delete({
        where: {
          id,
        },
      });
      console.log("Deletion successful");
    } catch (err) {
      console.log("Failure: ", err);
    }
  } else {
    res.status(401).json({ response: "401: Unauthorized request" });
  }
  res.end();
}
