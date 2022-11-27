import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import SortBy from "../Explore/SortBy";

type ExploreBarProps = {
  setSortBy: (value: string) => void;
};

const ExploreBar: React.FC<ExploreBarProps> = ({ setSortBy }) => {
  const { data: session, status } = useSession();
  return (
    <div className="flex items-center justify-between flex-wrap bg-white border-b border-gray-300 py-6 top-12 left-0 right-0 sticky">
      <div className="w-full h-full px-5 md:px-10 flex flex-col justify-center items-center gap-5 md:flex-row md:justify-between">
        <SortBy setSortBy={setSortBy} />
        {status === "authenticated" && (
          <>
            <Link href="/explore/create">
              <a className="btn bg-green-500 hover:bg-green-600 text-white font-semibold border-green-500 min-w-fit w-[60%] text-center md:w-fit">
                Create
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default ExploreBar;
