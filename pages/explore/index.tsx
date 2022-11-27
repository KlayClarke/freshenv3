import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import sanitize from "sanitize-html";
import Link from "next/link";
import unentity from "../../utils/unentity";
import SalonCard from "../../components/Salons/SalonCard";
import { Salon } from "../../atoms/salonsAtom";
import SortBy from "../../components/Explore/SortBy";
import InfiniteScroll from "react-infinite-scroll-component";
import ExploreBar from "../../components/Layout/ExploreBar";

type ExploreProps = {
  salonsByName: Salon[];
  salonsByType: Salon[];
  salonsByPrice: Salon[];
};

export default function Explore({
  salonsByName,
  salonsByType,
  salonsByPrice,
}: ExploreProps) {
  const [numElements, setNumElements] = useState(20); // sets initial number of elements to 20 -> will change as user scrolls down
  const [sortBy, setSortBy] = useState("name");
  const [salons, setSalons] = useState(salonsByName.slice(0, numElements));
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // below hook does a bunch of things: (1) handles the sorting of our salons when a user changes sort type, (2) handles infinite scroll data concatenation
  useEffect(() => {
    if (sortBy === "name") {
      setSalons(salonsByName.slice(0, numElements));
    }
    if (sortBy === "type") {
      setSalons(salonsByType.slice(0, numElements));
    }
    if (sortBy === "average_price") {
      setSalons(salonsByPrice.slice(0, numElements));
    }
  }, [sortBy, salonsByName, salonsByType, salonsByPrice, numElements]);

  return (
    <div>
      <ExploreBar setSortBy={setSortBy} />
      <div className="mt-1 mb-1 flex flex-col justify-center items-center">
        <div className="w-full xl:max-w-[1600px]">
          <InfiniteScroll
            dataLength={salons.length}
            next={() => {
              setNumElements(numElements + 20);
            }}
            hasMore={salons.length === salonsByName.length ? false : true}
            loader={<h4>Loading...</h4>}
          >
            <div className="w-[100%] grid lg:grid-cols-2 gap-5 p-10">
              {salons.map((salon: Salon, index: number) => {
                return <SalonCard key={index} salon={salon} />;
              })}
            </div>
          </InfiniteScroll>
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
