import { Appointment } from "../../../../atoms/appointmentsAtom";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { id: salon_id } = req.query;

  const appointments = (await prisma.appointment.findMany({
    where: {
      salon_id,
    },
  })) as Appointment;

  res.json({
    appointments: {
      appointments,
    },
  });
}
