import React from "react";

const WhyUsWriteup: React.FC = () => {
  return (
    <div className="w-full md:w-[80%] max-w-[1000px] mx-auto px-2">
      <h1 className="text-2xl lg:text-3xl text-center text-blue-500 font-semibold">
        Why us?
      </h1>
      <br />
      <p className="hidden xl:flex text-lg lg:text-xl text-center text-gray-400 px-10">
        As the son of a barber, it is hard not to notice the difficulties of my
        father&apos;s occupation. As independent contractors, barbers and
        cosmetologists lack steady income. However, they&apos;ve proven to be
        some of the most respected individuals in certain communities.
      </p>
      <br />
      <p className="text-lg lg:text-xl text-center text-gray-400 px-10">
        My father has witnessed his fair share of struggles, having owned a
        barbershop for over two decades. During the economic hardship of 2008
        and the health crises that ruined 2020, never once did our reliance on
        and respect for hairstylists waver. Today, they continue to be relied
        upon as technicians to whom we grant the honor of altering our likeness.
      </p>
      <br />
      <p className="text-lg lg:text-xl text-center text-gray-400 px-10">
        Here at
        <span className="text-blue-500 font-semibold"> freshen</span>, we hope
        to mediate and strengthen the connection between cosmetologist and
        consumer.
      </p>
    </div>
  );
};
export default WhyUsWriteup;
