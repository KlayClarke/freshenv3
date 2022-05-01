import { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import initializeClusterMap from "../map/initializeClusterMap";
import { fetcher } from "../utils/fetcher";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();

  const { data, error } = useSWR(
    "https://thawing-reaches-97496.herokuapp.com/api/salons",
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
    <div className="flex flex-col justify-center items-center">
      <div className="w-full xl:max-w-[1600px]">
        <div className="flex flex-col justify-center items-center gap-10">
          <Head>
            <Script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js" />
          </Head>
          <h1 className="text-4xl max-w-4xl text-center text-blue-500">
            Whether you are a customer searching for a new hairstylist or a
            hairstylist searching for new customers,{" "}
            <span className="font-bold">freshen</span> is the answer
          </h1>
          <div className="flex gap-5">
            <a
              href="/auth/join"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-500 rounded"
            >
              Create New Account
            </a>
            <a
              href="/auth/login"
              className="bg-white hover:bg-gray-50 text-blue-500 font-bold py-2 px-4 border border-blue-500 rounded"
            >
              Log In Using Existing Account
            </a>
          </div>
          <div
            id="map"
            className="w-[80%] lg:w-[800px] h-[400px] rounded border"
          ></div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const client = await clientPromise;

//   const db = client.db("FreshenDatabase");

//   let salons = await db
//     .collection("salons")
//     .find({})
//     .sort({ name: 1 })
//     .toArray();
//   salons = JSON.parse(JSON.stringify(salons));

//   return {
//     props: { salons },
//   };
// }
