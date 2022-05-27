import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import * as sanitizeHtml from "sanitize-html";
import Link from "next/link";
import Image from "next/image";
import unentity from "../../utils/unentity";

export default function Explore({ salonsByName, salonsByType, salonsByPrice }) {
  const [sortBy, setSortBy] = useState("name");
  const [salons, setSalons] = useState(salonsByName);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // unentity values before displaying them -- turn &amp; back to &, etc.

  useEffect(() => {
    if (sortBy === "name") {
      setSalons(salonsByName);
    }
    if (sortBy === "type") {
      setSalons(salonsByType);
    }
    if (sortBy === "average_price") {
      setSalons(salonsByPrice);
    }
  }, [sortBy, salonsByName, salonsByType, salonsByPrice]);

  return (
    <div className="mt-1 mb-1 flex flex-col justify-center items-center">
      <div className="w-full xl:max-w-[1600px]">
        <div className="px-5 md:px-10 pt-10 flex flex-col justify-center items-center gap-5 md:flex-row md:justify-between">
          <div className="relative w-64">
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
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
          {status === "authenticated" && (
            <>
              <Link href="/explore/create">
                <a className="btn bg-green-500 hover:bg-green-600 text-white font-semibold border-green-500 min-w-fit w-[60%] text-center md:w-fit">
                  Create
                </a>
              </Link>
            </>
          )}
        </div>
        <div className="w-[100%] grid lg:grid-cols-2 gap-5 p-10">
          {salons.map((salon, index) => {
            return (
              <div
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
                key={index}
              >
                <div className="md:flex">
                  <div className="md:shrink-0">
                    <img
                      className="h-48 w-full object-cover md:w-48"
                      src={
                        salon.image ||
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                      }
                      alt="shop"
                      layout="fill"
                    />
                  </div>
                  <div className="p-8 min-w-[50%]">
                    <div className="uppercase tracking-wide font-semibold">
                      <p className="text-sm text-blue-500">
                        {unentity(sanitizeHtml(salon.type))}
                      </p>
                      <p className="text-md text-green-600">
                        ${unentity(sanitizeHtml(salon.average_price))}
                      </p>
                    </div>
                    <Link href={`/explore/detail/${salon.id}`}>
                      <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                        {unentity(sanitizeHtml(salon.name))}
                      </a>
                    </Link>
                    <p className="mt-2 text-slate-500 h-fit min-w-[80%] truncate">
                      {unentity(sanitizeHtml(salon.street_address))}{" "}
                      {unentity(sanitizeHtml(salon.city))},{" "}
                      {unentity(sanitizeHtml(salon.state))}{" "}
                      {unentity(sanitizeHtml(salon.zip_code))}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const salonsByName = await prisma.salon.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  const salonsByType = await prisma.salon.findMany({
    orderBy: [
      {
        type: "asc",
      },
      {
        name: "asc",
      },
    ],
  });

  const salonsByPrice = await prisma.salon.findMany({
    orderBy: [
      {
        average_price: "asc",
      },
    ],
  });

  return {
    props: { salonsByName, salonsByType, salonsByPrice },
  };
}