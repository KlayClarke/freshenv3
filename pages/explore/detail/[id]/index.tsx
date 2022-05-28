import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import initializeClusterMap from "../../../../map/initializeClusterMap";
import useSWR from "swr";
import { fetcher } from "../../../../utils/fetcher";
import prisma from "../../../../lib/prisma";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import unentity from "../../../../utils/unentity";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SalonCard from "../../../../components/Salons/SalonCard";
import ReviewSection from "../../../../components/Reviews/ReviewSection";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Detail({ salon }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState<any>();
  const { data: salons, error } = useSWR(
    process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/salons/get",
    fetcher
  );
  const router = useRouter();
  const { id: salon_id } = router.query;

  useEffect(() => {
    setPageIsMounted(true);

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: salon.coordinates,
      zoom: 15,
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
      <div className="max-w-[1400px] w-full lg:w-[1400px]">
        {/* hero */}
        <section className="relative">
          <div id="map" className="h-[200px] lg:h-[300px] lg:w-full"></div>
          <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center mt-10 px-10"></div>
        </section>
        {/* features */}
        <section className="flex flex-col items-center">
          <div className="px-10 lg:py-10 flex flex-col justify-center items-center w-full">
            {/* feature 1 */}
            <div className="w-[100%] lg:max-w-[800px]">
              <SalonCard salon={salon} salonPage />
              <ReviewSection />
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
