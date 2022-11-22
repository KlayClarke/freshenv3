import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import findLocation from "../../../map/findLocation";
import validator from "validator";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { user } = session;

  if (req.method === "POST") {
    // Process POST request
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
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          salons: {
            create: {
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
          },
        },
      });
    } catch (err) {
      console.log("Failure: ", err);
    }
    res.end();
  }
}
