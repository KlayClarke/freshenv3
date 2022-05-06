import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { user_id } = session;
  const { id } = req.query;

  // only delete salon if user is logged in and user_id is same as salon id

  if (req.method === "POST" && session && user_id) {
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
