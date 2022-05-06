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

// todo: render mapbox map on explore detail page

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Detail({ salon }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
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
        <section className="flex flex-col items-center">
          <div className="sm:py-10 flex flex-col justify-center items-center">
            {/* feature 1 */}
            <div className="sm:px-10 w-[80%]">
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="flex flex-col">
                  <div>
                    <img
                      className="h-36 sm:h-48 w-full object-cover"
                      src={
                        salon.image ||
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                      }
                      alt="shop"
                      layout="fill"
                    />
                  </div>
                  <div className="p-4 lg:p-6">
                    <div className="uppercase tracking-wide font-semibold w-[80%]">
                      <p className="text-xs sm:text-sm text-blue-500 w-[80%]">
                        {unentity(sanitizeHtml(salon.type))}
                      </p>
                      <p className="text-sm sm:text-md text-green-600 w-[80%]">
                        ${unentity(sanitizeHtml(salon.average_price))}
                      </p>
                    </div>
                    <p className="block mt-1 text-sm sm:text-md leading-tight font-medium text-black max-w-[80%] truncate">
                      {unentity(sanitizeHtml(salon.name))}
                    </p>
                    <p className="text-sm sm:text-md mt-2 text-slate-500 h-fit max-w-[80%] truncate">
                      {unentity(sanitizeHtml(salon.street_address))}{" "}
                      {unentity(sanitizeHtml(salon.city))},{" "}
                      {unentity(sanitizeHtml(salon.state))}{" "}
                      {unentity(sanitizeHtml(salon.zip_code))}
                    </p>
                    {status === "authenticated" &&
                      session.user_id === salon.author_id && (
                        <>
                          <div className="py-2 flex gap-4">
                            <Link href="#">
                              <a className="btn bg-[#ffc006] hover:bg-[#ffc106d9] text-white font-semibold text-center">
                                Edit
                              </a>
                            </Link>
                            <Link href={`/explore/detail/${salon.id}/delete`}>
                              <a className="btn bg-[#dd3444] hover:bg-[#ca2e3e] text-white font-semibold text-center">
                                Delete
                              </a>
                            </Link>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </div>
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
