import { useState, useEffect } from "react";
import clientPromise from "../../lib/mongodb";

export default function Explore({
  salonsByName,
  salonsByType,
  salonsByAveragePrice,
}) {
  const [sortBy, setSortBy] = useState("name");
  const [salons, setSalons] = useState(salonsByName);

  useEffect(() => {
    if (sortBy === "name") {
      setSalons(salonsByName);
    } else if (sortBy === "type") {
      setSalons(salonsByType);
    } else if (sortBy === "average_price") {
      setSalons(salonsByAveragePrice);
    }
  }, [sortBy]);

  return (
    <div className="mt-1 mb-1">
      <div className="px-10 pt-10">
        <div className="relative w-64">
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value={"name"}>Sort by name</option>
            <option value={"type"}>Sort by type</option>
            <option value={"average_price"}>Sort by $</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[100%] grid lg:grid-cols-2 gap-5 p-10">
        {salons.map((salon, index) => {
          return (
            <div
              className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden"
              key={index}
            >
              <div className="md:flex">
                <div className="md:shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={salon.image}
                    alt="shop"
                  />
                </div>
                <div className="p-8 min-w-[50%]">
                  <div className="uppercase tracking-wide font-semibold">
                    <p className="text-sm text-blue-500">{salon.type}</p>
                    <p className="text-md text-green-600">
                      ${salon.average_price}
                    </p>
                  </div>
                  <a
                    href={`/explore/detail/${salon._id}`}
                    className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                  >
                    {salon.name}
                  </a>
                  <p className="mt-2 text-slate-500 h-fit min-w-[80%] truncate">
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

  let salonsByName = await db
    .collection("salons")
    .find({})
    .sort({ name: 1 })
    .toArray();
  salonsByName = JSON.parse(JSON.stringify(salonsByName));

  let salonsByType = await db
    .collection("salons")
    .find({})
    .sort({ type: 1, name: 1 })
    .toArray();
  salonsByType = JSON.parse(JSON.stringify(salonsByType));

  let salonsByAveragePrice = await db
    .collection("salons")
    .find({})
    .sort({ average_price: 1 })
    .toArray();
  salonsByAveragePrice = JSON.parse(JSON.stringify(salonsByAveragePrice));

  return {
    props: { salonsByName, salonsByType, salonsByAveragePrice },
  };
}
