import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import sanitize from "sanitize-html";
import Link from "next/link";
import unentity from "../../utils/unentity";
import SalonCard from "../../components/SalonCard";
import { Salon } from "../../atoms/salonsAtom";
import SortBy from "../../components/SortBy";

type ExploreProps = {
  salonsByName: Salon[];
  salonsByType: Salon[];
  salonsByPrice: Salon[];
};

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
          <SortBy setSortBy={setSortBy} />
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
          {salons.map((salon: Salon, index: number) => {
            return <SalonCard key={index} salon={salon} />;
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
