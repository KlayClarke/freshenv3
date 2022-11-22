import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import validator from "validator";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { user } = session;

  // update salon with new review

  if (req.method === "POST") {
    // Process POST request
    const { rating, body, salon_id } = req.body;

    try {
      await prisma.salon.update({
        where: {
          id: salon_id,
        },
        data: {
          reviews: {
            create: {
              rating,
              body,
              author_id: user.id,
            },
          },
        },
      });
    } catch (err) {
      console.log("Failure: ", err);
    }
    res.end();
  }
}
