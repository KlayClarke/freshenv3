import { useState, useEffect } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Login({ csrfToken }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-5xl text-blue-500 font-semibold">Welcome Back</h1>
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
          <p className="text-black font-semibold">Login With Google</p>
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
          <p className="text-white font-semibold">Login With Github</p>
        </button>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link href="/auth/join">
            <a className="text-blue-500 font-semibold">Join</a>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
