import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import initializeClusterMap from "../map/initializeClusterMap";
import { fetcher } from "../utils/fetcher";
import * as sanitizeHtml from "sanitize-html";
import prisma from "../lib/prisma";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home({ salon }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState<any>();
  const { data: session, status } = useSession();
  const { data: salons, error } = useSWR(
    process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/salons/get",
    fetcher
  );

  const imageLoader = () => {
    return (
      salon.image ||
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
    );
  };
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
                <div className="w-[80%] flex flex-1 flex-col items-center lg:items-start">
                  <h2 className="text-blue-500 text-3xl md:text-4xl lg:text-6xl text-center lg:text-left mb-6 font-semibold">
                    Welcome to freshen!
                  </h2>
                  <p className="text-gray-500 text-xl text-center lg:text-left mb-6">
                    Are you a hairstylist searching for new customers? Are you
                    an eager customer searching for a new look?
                  </p>
                  <div className="flex justify-center flex-wrap gap-6">
                    <Link href="/auth/join">
                      <a className="btn bg-blue-500 text-white font-semibold hover:bg-blue-600">
                        Get Started
                      </a>
                    </Link>
                    <Link href="/auth/login">
                      <a className="btn bg-gray-50 text-blue-500 font-semibold hover:bg-gray-200">
                        Login
                      </a>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-1 flex-col items-center">
                  <h2 className="text-blue-500 text-3xl md:text-4xl lg:text-6xl text-center font-semibold">
                    Welcome back, {session.user.name.split(" ")[0]}!
                  </h2>
                </div>
              </>
            )}
          </div>
        </section>
        {/* features */}
        <section className="relative bg-gray-50 py-20 mt-10 lg:mt-30 w-fit">
          {/* heading */}
          <div className="w-full md:w-[80%] max-w-[1000px] mx-auto px-2">
            <h1 className="text-2xl lg:text-3xl text-center text-blue-500 font-semibold">
              Why us?
            </h1>
            <br />
            <p className="hidden xl:flex text-lg lg:text-xl text-center text-gray-400 px-10">
              As the son of a barber, it is hard not to notice the difficulties
              of my father&apos;s occupation. As independent contractors,
              barbers and cosmetologists lack steady income. However,
              they&apos;ve proven to be some of the most respected individuals
              in certain communities.
            </p>
            <br />
            <p className="text-lg lg:text-xl text-center text-gray-400 px-10">
              My father has witnessed his fair share of struggles, having owned
              a barbershop for over two decades. During the economic hardship of
              2008 and the health crises that ruined 2020, never once did our
              reliance on and respect for hairstylists waver. Today, they
              continue to be relied upon as technicians to whom we grant the
              honor of altering our likeness.
            </p>
            <br />
            <p className="text-lg lg:text-xl text-center text-gray-400 px-10">
              Here at
              <span className="text-blue-500 font-semibold"> freshen</span>, we
              hope to mediate and strengthen the connection between
              cosmetologist and consumer.
            </p>
          </div>
          {salon.name && (
            <>
              {/* feature 2 */}
              <div className="relative mt-20 lg:mt-20 md:px-10">
                <div className="container w-[80%] mx-auto flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24">
                  {/* image */}
                  <div className="w-[100%] flex flex-1 justify-center z-0 mb-10 lg:mb-0">
                    <div className="w-fit bg-white rounded-lg shadow-sm border-2 overflow-hidden">
                      <div className="md:flex">
                        <div className="relative md:shrink-0 ">
                          <div className="relative h-48 md:w-48 w-full object-cover">
                            <Image
                              src={salon.image}
                              layout="fill"
                              alt="best barbershop in tri state area"
                              quality={100}
                              unoptimized={true}
                            />
                          </div>
                        </div>
                        <div className="p-4 md:p-8 min-w-[50%]">
                          <div className="uppercase tracking-wide font-semibold">
                            <p className="text-sm text-blue-500">
                              {sanitizeHtml(salon.type)}
                            </p>
                            <p className="text-md text-green-600">
                              ${sanitizeHtml(salon.average_price)}
                            </p>
                          </div>
                          <Link href={`/explore/detail/${salon.id}`}>
                            <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                              {sanitizeHtml(salon.name)}
                            </a>
                          </Link>
                          <p className="mt-2 text-slate-500 h-fit min-w-[80%] truncate">
                            {sanitizeHtml(salon.street_address)}{" "}
                            {sanitizeHtml(salon.city)},{" "}
                            {sanitizeHtml(salon.state)}{" "}
                            {sanitizeHtml(salon.zip_code)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* content */}
                  <div className="flex flex-1 flex-col items-center lg:items-start">
                    <h1 className="sm:text-2xl md:text-3xl text-blue-500 text-center lg:text-left">
                      If you ever find yourself in Connecticut, stop by the best
                      barbershop in the tri-state area.
                    </h1>
                    <p className="text-gray-400 my-4 text-center lg:text-left sm:w-3/4 lg:w-full"></p>
                    <Link href={`/explore/detail/${salon.id}`}>
                      <a className="btn bg-blue-500 text-white font-semibold hover:bg-blue-600">
                        Visit Page
                      </a>
                    </Link>
                  </div>
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
