import { useRouter } from "next/router";
import clientPromise from "../../../lib/mongodb";

// todo: render mapbox map on explore detail page

export default function Detail({ salon }) {
  return (
    <div>
      <h1 className="text-4xl">{salon.name}</h1>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const client = await clientPromise;

  const db = client.db("FreshenDatabase");

  let salons = await db.collection("salons").find({}).toArray();

  salons = JSON.parse(JSON.stringify(salons));

  let salon;

  for (let i = 0; i < salons.length; i++) {
    salons[i]._id == query.id ? (salon = salons[i]) : "";
  }

  return {
    props: { salon },
  };
}
