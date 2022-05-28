import React from "react";
import Link from "next/link";
import { Salon } from "../../atoms/salonsAtom";

type VisitWriteupProps = {
  salon: Salon;
};

const VisitWriteup: React.FC<VisitWriteupProps> = ({ salon }) => {
  return (
    <div className="flex flex-1 flex-col items-center">
      <h1 className="sm:text-2xl md:text-3xl text-blue-500 text-center">
        If you ever find yourself in Connecticut, stop by the best barbershop in
        the tri-state area.
      </h1>
      <p className="text-gray-400 my-4 text-center lg:text-left sm:w-3/4 lg:w-full"></p>
      <Link href={`/explore/detail/${salon.id}`}>
        <a className="btn bg-blue-500 text-white font-semibold hover:bg-blue-600">
          Visit Page
        </a>
      </Link>
    </div>
  );
};
export default VisitWriteup;
