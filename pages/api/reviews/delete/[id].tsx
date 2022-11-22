import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { user } = session;
  const { id: review_id } = req.query;

  let review = await prisma.review.findUnique({
    where: {
      id: review_id,
    },
  });

  if (req.method === "POST" && session && user.id === review.author_id) {
    try {
      const review = await prisma.review.delete({
        where: {
          id: review_id,
        },
      });
    } catch (err) {
      console.log("Failure: ", err);
    }
  } else {
    res.status(401).json({ response: "401: Unauthorized request" });
  }
  res.end();
}
