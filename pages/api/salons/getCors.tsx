import nc from "next-connect";
import cors from "cors";
import { Salon } from "../../../atoms/salonsAtom";
const handler = nc()
  // use connect based middleware
  .use(cors())
  .get(async (_req, res) => {
    try {
      const response = await fetch(
        "https://freshenv3.vercel.app/api/salons/get",
        {
          method: "GET",
          mode: "cors",
        }
      );
      res.json({ data: response }) as Salon[];
    } catch (error) {
      console.log("cors handler error: ", error);
    }
  });

export default handler;
