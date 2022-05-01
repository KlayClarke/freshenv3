import { useState, useEffect } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

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
      <button
        className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 py-2 mb-4 flex items-center hover:bg-gray-50 border rounded"
        onClick={() => {
          signIn("google", {
            callbackUrl: "/",
          });
        }}
      >
        <FontAwesomeIcon icon={faGoogle} className="mr-2 text-blue-500" />
        <p className="text-blue-500 font-semibold">Login With Google</p>
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn("credentials", { username: "", password: "" });
        }}
        className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
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
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
            value={formData.username}
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
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            value={formData.password}
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-500 rounded w-full">
          Login
        </button>
        <p className="mt-4">
          Don't have an account?{" "}
          <a href="/auth/join" className="text-blue-500">
            Join
          </a>{" "}
        </p>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
