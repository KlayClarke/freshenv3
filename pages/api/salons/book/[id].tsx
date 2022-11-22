import { getSession } from "next-auth/react";
import Cors from "cors";
import { Salon } from "../../../../atoms/salonsAtom";
import initMiddleware from "../../../../lib/init-middleware";
import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // run cors
  await cors(req, res);

  const session = await getSession({ req });
  const { user } = session;
  const { id } = req.query;

  let salon: Salon = await prisma.salon.findUnique({
    where: {
      id,
    },
  });

  if (req.method === "POST" && session && user.id !== salon.author_id) {
    const { datetime, description } = req.body;

    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          appointments: {
            create: {
              datetime,
              description,
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
