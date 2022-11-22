import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { user } = session;

  if (req.method === "PUT") {
    // Process UPDATE request
    const { zipCode } = req.body;
    console.log(zipCode);

    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          zipCode,
        },
      });
    } catch (err) {
      console.log("Failure: ", err);
    }
    res.end();
  }
}
