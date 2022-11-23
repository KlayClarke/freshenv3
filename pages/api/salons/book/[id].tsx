import { getSession } from "next-auth/react";
import { Salon } from "../../../../atoms/salonsAtom";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { user } = session;
  const { id } = req.query;

  let salon: Salon = await prisma.salon.findUnique({
    where: {
      id,
    },
  });

  if (req.method === "POST" && session) {
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
