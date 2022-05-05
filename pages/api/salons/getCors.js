import nc from "next-connect";
import cors from "cors";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .get(async (req, res) => {
    const response = await fetch(
      "https://freshenv3-4d1ymiaed-klayclarke.vercel.app/api/salons/get",
      {
        method: "GET",
        mode: "cors",
      }
    );
    res.status(200).json({ data: response });
  });

export default handler;
