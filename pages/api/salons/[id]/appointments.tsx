import { Salon } from "../../../../atoms/salonsAtom";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { id: salon_id } = req.query;

  const appointments = (await prisma.appointment.findMany({
    where: {
      salon_id,
    },
  })) as Salon;

  res.json({
    appointments: {
      appointments,
    },
  });
}
