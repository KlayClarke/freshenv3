import { Appointment } from "../../../atoms/appointmentsAtom";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const appts = (await prisma.appointment.findMany()) as Appointment;
  res.json(appts);
}
