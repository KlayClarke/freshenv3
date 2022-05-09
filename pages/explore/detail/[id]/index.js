import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import initializeClusterMap from "../../../../map/initializeClusterMap";
import useSWR from "swr";
import { fetcher } from "../../../../utils/fetcher";
// import prisma from "../../../../lib/prisma";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import unentity from "../../../../utils/unentity";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Detail({ salon }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const [rating, setRating] = useState(3);
  const [body, setBody] = useState("");
  const { data: session, status } = useSession();
  const { data: salons, error } = useSWR(
    process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/salons/get",
    fetcher
  );
  const router = useRouter();
  const { id: salon_id } = router.query;

  async function handleReviewCreation(e) {
    e.preventDefault();
    const res = await fetch(
      process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/reviews/create",
      {
        body: JSON.stringify({
          rating,
          body,
          salon_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    setBody("");
    router.push(`/explore/detail/${salon_id}`);
  }

  async function handleReviewDeletion(e, id) {
    e.preventDefault();
    const res = await fetch(
      process.env.NEXT_PUBLIC_SITE_ENDPOINT + `/api/reviews/delete/${id}`,
      {
        method: "POST",
      }
    );
    router.push(`/explore/detail/${salon_id}`);
  }

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
      <div className="max-w-[1400px] w-full lg:w-[1400px]">
        {/* hero */}
        <section className="relative">
          <div id="map" className="h-[200px] lg:h-[300px] lg:w-full"></div>
          <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center mt-10 px-10"></div>
        </section>
        {/* features */}
      </div>
    </div>
  );
}

// export async function getServerSideProps({ query }) {
//   const salon = await prisma.salon.findUnique({
//     where: {
//       id: query.id,
//     },
//     include: {
//       reviews: {
//         include: {
//           author: true,
//         },
//       },
//     },
//   });

//   return {
//     props: { salon },
//   };
// }
