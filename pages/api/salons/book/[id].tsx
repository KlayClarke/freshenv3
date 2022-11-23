import { getSession } from "next-auth/react";
import { Salon } from "../../../../atoms/salonsAtom";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { user } = session;
  const { id } = req.query;

  if (req.method === "POST" && session) {
    const { date_time, description } = req.body;

    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          appointments: {
            create: {
              date_time,
              description,
              salon_id: id,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
    res.end();
  }
}
