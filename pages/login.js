export default function Login() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <form className="bg-white shadow-sm border rounded-lg px-8 pt-6 pb-8 mb-4">
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
          Login
        </button>
        <p className="mt-4">
          Don't have an account?{" "}
          <a href="/join" className="text-blue-500">
            Join
          </a>{" "}
        </p>
      </form>
    </div>
  );
}
