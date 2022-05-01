import { useState } from "react";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Join() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    salons: [],
    reviews: [],
  });

  async function join(data) {
    try {
      fetch(process.env.NEXT_PUBLIC_USER_API_ENDPOINT + "/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {});
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSubmit(data) {
    try {
      join(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <button
        className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 py-2 mb-4 flex items-center hover:bg-gray-50 border rounded"
        onClick={() => {
          signIn();
        }}
      >
        <FontAwesomeIcon icon={faGoogle} className="mr-2 text-blue-500" />
        <p className="text-blue-500 font-semibold">Join With Google</p>
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 pt-6 pb-8 mb-4"
      >
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
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
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
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-500 rounded w-full">
          Join
        </button>
        <p className="mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-500">
            Log In
          </a>{" "}
        </p>
      </form>
    </div>
  );
}
