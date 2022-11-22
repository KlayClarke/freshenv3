import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";
import findLocation from "../../../../map/findLocation";

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
    const {
      name,
      type,
      average_price,
      image,
      street_address,
      city,
      state,
      zip_code,
    } = req.body;

    const coordinates =
      (await findLocation(street_address, city, state, zip_code)) || [];

    try {
      const salon = await prisma.salon.update({
        where: {
          id,
        },
        data: {
          name,
          type,
          average_price: parseInt(average_price),
          image,
          street_address,
          city,
          state,
          zip_code,
          coordinates,
        },
      });
      console.log("Update successful");
    } catch (err) {
      console.log("Failure: ", err);
    }
  } else {
    res.status(401).json({ response: "401: Unauthorized request" });
  }
  res.end();
}
