import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Join() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl lg:text-5xl text-blue-500 font-semibold px-12 text-center">
        Get Started With
      </h1>
      <br />
      <div className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center">
        <button
          type="button"
          className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-4 py-2 md:px-8 md:py-2 mb-4 flex items-center hover:bg-gray-50 border rounded"
          onClick={() => {
            signIn("google", {
              callbackUrl: "/",
            });
          }}
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2 text-black" />
          <p className="text-black text-md lg:text-lg font-semibold">Google</p>
        </button>
        <button
          type="button"
          className="bg-black sm:shadow-sm sm:border sm:rounded-lg px-4 py-2 md:px-8 md:py-2 mb-4 flex items-center hover:bg-gray-800 border rounded"
          onClick={() => {
            signIn("github", {
              callbackUrl: "/",
            });
          }}
        >
          <FontAwesomeIcon icon={faGithub} className="mr-2 text-white" />
          <p className="text-white text-md lg:text-lg font-semibold">Github</p>
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/auth/login">
            <a className="text-blue-500 font-semibold">Log In</a>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
