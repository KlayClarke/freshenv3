import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import initializeClusterMap from "../../../map/initializeClusterMap";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import prisma from "../../../lib/prisma";
import Link from "next/link";

// todo: render mapbox map on explore detail page

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Detail({ salon }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const { data: salons, error } = useSWR(
    process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/salons/get",
    fetcher
  );

  useEffect(() => {
    setPageIsMounted(true);

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: salon.coordinates,
      zoom: 16,
    });

    setMap(map);
  }, [salon.coordinates]);

  useEffect(() => {
    if (pageIsMounted && salons) {
      Map.on("load", () => {
        initializeClusterMap(mapboxgl, Map, salons);
      });
    }
  }, [pageIsMounted, salons, Map, salon.coordinates]);

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[1400px]">
        {/* hero */}
        <section className="relative">
          <div id="map" className="h-[200px] lg:h-[300px] lg:w-[1000px]"></div>
          <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center mt-10 px-10"></div>
        </section>
        {/* features */}
        <section className="bg-gray-50 py-20 mt-10 lg:mt-30">
          {/* heading */}
          <div className="max-w-[1000px] mx-auto px-2">
            <h1 className="text-2xl md:text-3xl text-center text-blue-500 font-semibold">
              {salon.name}
            </h1>
            <br />

            <h1 className="text-2xl md:text-3xl text-center text-blue-500 font-semibold">
              This page is under construction!
            </h1>
          </div>
          {/* feature 1 */}
          <div className="relative mt-20 lg:mt-24 px-10">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-x-24">
              {/* content */}
              <div className="flex flex-1 flex-col items-center">
                <h1 className="text-2xl md:text-3xl text-center text-blue-500 font-semibold">
                  Ratings and review section coming soon.
                </h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const salon = await prisma.salon.findUnique({
    where: {
      id: query.id,
    },
  });

  return {
    props: { salon },
  };
}
