import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import initializeClusterMap from "../map/initializeClusterMap";
import { fetcher } from "../utils/fetcher";
import sanitize from "sanitize-html";
import prisma from "../lib/prisma";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import SalonCard from "../components/Salons/SalonCard";
import WhyUsWriteup from "../components/Home/WhyUsWriteup";
import VisitWriteup from "../components/Home/VisitWriteup";
import WelcomeWriteUp from "../components/Home/WelcomeWriteUp";
import WelcomeBack from "../components/Home/WelcomeBack";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home({ salon }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState<any>();
  const { data: session, status } = useSession();
  const { data: salons, error } = useSWR(
    process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/salons/get",
    fetcher
  );

  useEffect(() => {
    setPageIsMounted(true);

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-75, 43],
      zoom: 4.75,
    });

    setMap(map);
  }, []);

  useEffect(() => {
    if (pageIsMounted && salons && Map) {
      Map.on("load", () => {
        initializeClusterMap(mapboxgl, Map, salons);
      });
    }
  }, [pageIsMounted, salons, Map]);

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[1400px]">
        <Script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js" />
        {/* hero */}
        <section className="relative">
          <div id="map" className="min-h-[200px] lg:min-h-[400px]"></div>
          <div className="xs:w-[40%] sm:w-[80%] container mx-auto flex flex-col-reverse lg:flex-row items-center mt-10 px-10">
            {/* Content */}
            {status === "unauthenticated" ? (
              <>
                <WelcomeWriteUp />
              </>
            ) : (
              <>{session.user.name && <WelcomeBack user={session.user} />}</>
            )}
          </div>
        </section>
        {/* features */}
        <section className="relative bg-gray-50 py-20 mt-10 lg:mt-30 w-fit">
          {/* heading */}
          <WhyUsWriteup />
          {salon.name && (
            <>
              {/* feature 2 */}
              <div className="relative mt-20 lg:mt-20 md:px-10">
                <div className="container w-[80%] mx-auto flex flex-col items-center justify-center gap-x-24">
                  {/* image */}
                  <div className="w-[100%] flex flex-1 justify-center z-0 mb-10 ">
                    <SalonCard salon={salon} />
                  </div>
                  {/* content */}
                  <VisitWriteup salon={salon} />
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await prisma.salon.findMany({
    where: {
      name: "Better Cut",
    },
  });

  return {
    props: {
      salon: data[0],
    },
  };
}
