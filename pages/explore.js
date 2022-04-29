import clientPromise from "../lib/mongodb";

export default function Explore({ salons }) {
  return (
    <div>
      <div>
        {salons.map((salon, index) => {
          return (
            <div className="" key={index}>
              <h2>{salon.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const client = await clientPromise;

  const db = client.db("FreshenDatabase");

  let salons = await db.collection("salons").find({}).toArray();
  salons = JSON.parse(JSON.stringify(salons));

  return {
    props: { salons },
  };
}
