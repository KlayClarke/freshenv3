import React from "react";
import Link from "next/link";

type WelcomeWriteUpProps = {};

const WelcomeWriteUp: React.FC<WelcomeWriteUpProps> = () => {
  return (
    <div className="w-[80%] flex flex-1 flex-col items-center lg:items-start">
      <h2 className="text-blue-500 text-3xl md:text-4xl lg:text-6xl text-center lg:text-left mb-6 font-semibold">
        Welcome to freshen!
      </h2>
      <p className="text-gray-500 text-xl text-center lg:text-left mb-6">
        Are you a hairstylist searching for new customers? Are you an eager
        customer searching for a new look?
      </p>
      <div className="flex justify-center flex-wrap gap-6">
        <Link href="/auth/join">
          <a className="btn bg-blue-500 text-white font-semibold hover:bg-blue-600">
            Get Started
          </a>
        </Link>
        <Link href="/auth/login">
          <a className="btn bg-gray-50 text-blue-500 font-semibold hover:bg-gray-200">
            Login
          </a>
        </Link>
      </div>
    </div>
  );
};
export default WelcomeWriteUp;
