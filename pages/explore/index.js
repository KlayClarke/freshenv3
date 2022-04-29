import clientPromise from "../../lib/mongodb";

export default function Explore({ salons, marginTop }) {
  return (
    <div className="mt-10 mb-10">
      <div className="w-[100%] grid lg:grid-cols-2 gap-10 p-10">
        {salons.map((salon, index) => {
          return (
            <div class="bg-white rounded-lg shadow border overflow-hidden">
              <div class="md:flex">
                <div class="md:shrink-0">
                  <img
                    class="h-48 w-full object-cover md:w-48"
                    src={salon.image}
                    alt="shop"
                  />
                </div>
                <div class="p-8 w-full">
                  <div class="uppercase tracking-wide text-sm text-blue-500 font-semibold">
                    {salon.type}
                  </div>
                  <a
                    href={`/explore/${salon._id}`}
                    class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                  >
                    {salon.name}
                  </a>
                  <p class="mt-2 text-slate-500">
                    {salon.street_address} {salon.city}, {salon.state}{" "}
                    {salon.zip_code}
                  </p>
                </div>
              </div>
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
