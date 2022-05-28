import React, { useState, useEffect } from "react";
import { Salon } from "../../atoms/salonsAtom";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import mapboxgl from "mapbox-gl";
import initializeClusterMap from "../../map/initializeClusterMap";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type MapboxMapProps = {
  coordinates: [number, number];
  salonPage?: boolean;
};

const MapboxMap: React.FC<MapboxMapProps> = ({ coordinates, salonPage }) => {
  const [Map, setMap] = useState<any>();
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const { data: salons, error } = useSWR(
    process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/salons/get",
    fetcher
  );

  useEffect(() => {
    setPageIsMounted(true);

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: coordinates,
      zoom: salonPage ? 15 : 4.75,
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

  return <div id="map" className="min-h-[200px] lg:min-h-[400px]"></div>;
};
export default MapboxMap;
