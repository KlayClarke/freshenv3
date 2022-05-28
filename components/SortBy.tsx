import React, { useEffect, useState } from "react";
import { Salon } from "../atoms/salonsAtom";

type SortByProps = {
  setSortBy: (value: string) => void;
};

const SortBy: React.FC<SortByProps> = ({ setSortBy }) => {
  return (
    <div className="relative w-64">
      <select
        name="sort_by"
        title="sort by"
        onChange={(e) => setSortBy(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
      >
        <option value={"name"}>Sort by name</option>
        <option value={"type"}>Sort by type</option>
        <option value={"average_price"}>Sort by $</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};
export default SortBy;
