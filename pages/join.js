import { signIn } from "next-auth/react";

export default function Join() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 py-2 mb-4">
        <button
          className=""
          onClick={() => {
            signIn("google", {
              callbackUrl: process.env.NEXT_PUBLIC_SITE_URL,
            });
          }}
        >
          Join With Google
        </button>
      </div>
      <form className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            id="email"
            type={"email"}
          />
        </div>
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            id="username"
            type={"text"}
          />
        </div>
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            id="password"
            type={"password"}
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-500 rounded w-full">
          Join
        </button>
        <p className="mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Log In
          </a>{" "}
        </p>
      </form>
    </div>
  );
}
