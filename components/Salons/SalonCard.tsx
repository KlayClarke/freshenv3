import React from "react";
import Link from "next/link";
import { Salon } from "../../atoms/salonsAtom";
import sanitize from "sanitize-html";
import unentity from "../../utils/unentity";

type SalonCardProps = {
  salon: Salon;
};

const SalonCard: React.FC<SalonCardProps> = ({ salon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={
              salon.image ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
            }
            alt="shop"
          />
        </div>
        <div className="p-8 min-w-[50%]">
          <div className="uppercase tracking-wide font-semibold">
            <p className="text-sm text-blue-500">
              {unentity(sanitize(salon.type))}
            </p>
            <p className="text-md text-green-600">${salon.average_price}</p>
          </div>
          <Link href={`/explore/detail/${salon.id}`}>
            <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {unentity(sanitize(salon.name))}
            </a>
          </Link>
          <p className="mt-2 text-slate-500 h-fit min-w-[80%] truncate">
            {unentity(sanitize(salon.street_address))}{" "}
            {unentity(sanitize(salon.city))}, {unentity(sanitize(salon.state))}{" "}
            {unentity(sanitize(salon.zip_code))}
          </p>
        </div>
      </div>
    </div>
  );
};
export default SalonCard;
