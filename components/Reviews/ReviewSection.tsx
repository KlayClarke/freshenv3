import React from "react";

type ReviewSectionProps = {};

const ReviewSection: React.FC<ReviewSectionProps> = () => {
  return (
    <div className="relative mt-20 lg:mt-24 px-5">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-x-24">
        {/* content */}
        <div className="flex flex-1 flex-col items-center">
          <h1 className="text-2xl md:text-3xl text-center text-gray-200 font-semibold">
            Ratings system &amp; review section currently in development.
          </h1>
        </div>
      </div>
    </div>
  );
};
export default ReviewSection;
