import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import initializeClusterMap from "../../../../map/initializeClusterMap";
import prisma from "../../../../lib/prisma";
import { useRouter } from "next/router";
import SalonCard from "../../../../components/Salons/SalonCard";
import ReviewSection from "../../../../components/Reviews/ReviewSection";
import MapboxMap from "../../../../components/Map/MapboxMap";

export default function Detail({ salon }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[1400px] w-full lg:w-[1400px]">
        {/* hero */}
        <section className="relative">
          <MapboxMap salonPage coordinates={salon.coordinates} />
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
