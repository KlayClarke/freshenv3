import React, { useEffect } from "react";
import Link from "next/link";
import { Salon } from "../../atoms/salonsAtom";
import sanitize from "sanitize-html";
import unentity from "../../utils/unentity";
import { useSession } from "next-auth/react";

type SalonCardProps = {
  salon: Salon;
  salonPage?: boolean;
};

const SalonCard: React.FC<SalonCardProps> = ({ salon, salonPage }) => {
  const { data: session, status } = useSession();
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className={salonPage ? "flex flex-col" : "md:flex"}>
        <div className="md:shrink-0">
          <img
            className={
              salonPage
                ? "h-36 sm:h-60 xl:h-80 w-full object-cover"
                : "h-48 w-full object-cover md:w-48"
            }
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
          {salonPage ? (
            <p className="block mt-1 text-lg leading-tight font-medium text-black">
              {unentity(sanitize(salon.name))}
            </p>
          ) : (
            <Link href={`/explore/detail/${salon.id}`}>
              <a
                className={
                  "block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                }
              >
                {unentity(sanitize(salon.name))}
              </a>
            </Link>
          )}

          <p className="mt-2 text-slate-500 h-fit min-w-[80%] truncate">
            {unentity(sanitize(salon.street_address))}{" "}
            {unentity(sanitize(salon.city))}, {unentity(sanitize(salon.state))}{" "}
            {unentity(sanitize(salon.zip_code))}
          </p>
          {status === "authenticated" &&
            session &&
            session.user.id === salon.author_id &&
            salonPage && (
              <>
                <div className="py-2 flex gap-4">
                  <Link href={`/explore/detail/${salon.id}/edit`}>
                    <a className="btn bg-[#ffc006] hover:bg-[#ffc106d9] text-white font-semibold text-center">
                      Edit
                    </a>
                  </Link>
                  <Link href={`/explore/detail/${salon.id}/delete_confirm`}>
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
  );
};
export default SalonCard;
