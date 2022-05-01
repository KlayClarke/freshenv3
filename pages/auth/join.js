import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Join() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-5xl text-blue-500 font-semibold">Join</h1>
      <br />
      <div className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center">
        <button
          className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 py-2 mb-4 flex items-center hover:bg-gray-50 border rounded"
          onClick={() => {
            signIn("google", {
              callbackUrl: "/",
            });
          }}
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2 text-black" />
          <p className="text-black font-semibold">With Google</p>
        </button>
        <button
          className="bg-black sm:shadow-sm sm:border sm:rounded-lg px-8 py-2 mb-4 flex items-center hover:bg-gray-800 border rounded"
          onClick={() => {
            signIn("github", {
              callbackUrl: "/",
            });
          }}
        >
          <FontAwesomeIcon icon={faGithub} className="mr-2 text-white" />
          <p className="text-white font-semibold">With Github</p>
        </button>
        <p className="mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-500 font-semibold">
            Log In
          </a>{" "}
        </p>
      </div>
    </div>
  );
}
