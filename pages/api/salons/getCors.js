import nc from "next-connect";
import cors from "cors";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .post(async (req, res) => {
    const response = await fetch(
      "https://freshenv3-4d1ymiaed-klayclarke.vercel.app/api/salons/get",
      {
        method: "GET",
        mode: "cors",
      }
    );
    res.json(response);
  });

export default handler;
