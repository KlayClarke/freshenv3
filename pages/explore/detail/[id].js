import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import mapboxgl from "mapbox-gl";
import initializeDetailMap from "../../../map/initializeDetailMap";
import clientPromise from "../../../lib/mongodb";

// todo: render mapbox map on explore detail page

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Detail({ salon }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();

  useEffect(() => {
    setPageIsMounted(true);

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 16,
      center: salon.geometry.coordinates,
    });

    setMap(map);
  }, []);

  useEffect(() => {
    if (pageIsMounted && salon) {
      initializeDetailMap(mapboxgl, Map, salon);
    }
  }, [pageIsMounted, salon, Map]);

  return (
    <div>
      <h1 className="text-4xl">{salon.name}</h1>
      <div id="map" className="w-[1000px] h-[400px]"></div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const client = await clientPromise;

  const db = client.db("FreshenDatabase");

  let salons = await db.collection("salons").find({}).toArray();

  salons = JSON.parse(JSON.stringify(salons));

  let salon;

  for (let i = 0; i < salons.length; i++) {
    salons[i]._id == query.id ? (salon = salons[i]) : "";
  }

  return {
    props: { salon },
  };
}
