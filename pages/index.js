import { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import initializeClusterMap from "../map/initializeClusterMap";
import { fetcher } from "../utils/fetcher";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home({ salons }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();

  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/salons/get",
    fetcher
  );

  useEffect(() => {
    setPageIsMounted(true);

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-75, 42],
      zoom: 5,
    });

    setMap(map);
  }, []);

  useEffect(() => {
    if (pageIsMounted && data) {
      Map.on("load", () => {
        initializeClusterMap(mapboxgl, Map, data);
      });
    }
  }, [pageIsMounted, data, Map]);

  return (
    <div>
      <Head>
        <Script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js" />
      </Head>
      {/* hero */}
      <section className="relative">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28 px-10">
          {/* Content */}
          <div className="flex flex-1 flex-col items-center lg:items-start">
            <h2 className="text-blue-500 text-3xl md:text-4xl lg:text-6xl text-center lg:text-left mb-6 font-semibold">
              Welcome to freshen!
            </h2>
            <p className="text-gray-500 text-xl text-center lg:text-left mb-6">
              Are you a hairstylist searching for new customers? Are you an
              eager customer searching for a new look?
            </p>
            <div className="flex justify-center flex-wrap gap-6">
              <a
                href="/auth/join"
                className="btn bg-blue-500 text-white font-semibold hover:bg-blue-600"
              >
                Get Started
              </a>
              <a
                href="/auth/login"
                className="btn bg-gray-50 text-black font-semibold hover:bg-gray-200"
              >
                Login with Existing Account
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* features */}
      <section className="bg-gray-50 py-20 mt-20 lg:mt-60">
        {/* heading */}
        <div className="max-w-[1000px] mx-auto px-2">
          <h1 className="text-4xl text-center text-blue-500">Features</h1>
          <p className="text-xl text-center text-gray-400 px-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin purus
            nulla, rhoncus eget eleifend vel, vestibulum sed arcu. Curabitur
            eleifend tristique metus eget dapibus. Proin eu ipsum sit amet eros
            gravida placerat vel quis nibh. Nullam id fringilla turpis.
            Suspendisse ullamcorper ligula non ex fringilla pulvinar. Nunc
            maximus mi sed cursus porta. Sed ut accumsan arcu. Maecenas libero
            dolor, hendrerit ut sodales eget, suscipit nec lacus. Morbi faucibus
            quam et diam sollicitudin, non iaculis quam condimentum. In a nibh
            faucibus quam ullamcorper molestie. Etiam ac maximus justo, eu
            suscipit nisl. Donec vitae tellus dui. Fusce eu orci sit amet tortor
            convallis auctor.
          </p>
        </div>
        {/* feature 1 */}
        <div className="relative mt-20 lg:mt-24 px-10">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-x-24">
            {/* image */}

            <div
              id="map"
              className="flex flex-1 justify-center mb-10 lg:mb-0 min-h-[400px] rounded-md border"
            ></div>

            {/* content */}
            <div className="flex flex-1 flex-col items-center lg:items-start">
              <h1 className="text-3xl text-blue-500">
                Sample Text for feature 1...
              </h1>
              <p className="text-gray-400 my-4 text-center lg:text-left sm:w-3/4 lg:w-full"></p>
              <a
                href="/explore"
                className="btn bg-blue-500 text-white font-semibold hover:bg-blue-600"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
        {/* feature 2 */}
        <div className="relative mt-20 lg:mt-52 px-10">
          <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24">
            {/* image */}
            <div className="flex flex-1 justify-center z-10 mb-10 lg:mb-0"></div>
            {/* content */}
            <div className="flex flex-1 flex-col items-center lg:items-start">
              <h1 className="text-3xl text-blue-500">
                Sample Text for feature 2...
              </h1>
              <p className="text-gray-400 my-4 text-center lg:text-left sm:w-3/4 lg:w-full"></p>
              <a
                href="/explore"
                className="btn bg-blue-500 text-white font-semibold hover:bg-blue-600"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
