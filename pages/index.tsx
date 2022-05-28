import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
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
import MapboxMap from "../components/Map/MapboxMap";

export default function Home({ salon }) {
  const { data: session, status } = useSession();

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[1400px]">
        <Script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js" />
        {/* hero */}
        <section className="relative">
          <MapboxMap coordinates={[-75, 43]} />
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
