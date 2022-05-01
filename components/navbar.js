import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white border-b border-gray-300 px-6 py-2 top-0 left-0 right-0 sticky z-10">
      <div className="flex items-center flex-shrink-0 text-blue-500 mr-6">
        <a className="font-semibold text-3xl tracking-tight" href="/">
          freshen
        </a>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="flex items-center px-3 py-2 border rounded bg-blue-500 text-white border-white  hover:border-blue-600"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={
          !isNavOpen
            ? "hidden lg:block"
            : "w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        }
      >
        <div className="text-sm lg:flex-grow">
          <a
            href="/explore"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-500 mr-4"
          >
            Explore
          </a>
          {status == "authenticated" ? (
            <>
              {" "}
              <a
                href="/account"
                className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-500 mr-4"
              >
                Account
              </a>
              <button
                onClick={() => {
                  signOut({
                    callbackUrl: process.env.NEXT_PUBLIC_SITE_URL,
                  });
                }}
                className="block mt-4 lg:inline-block lg:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-500 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/auth/login"
                className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-500 mr-4"
              >
                Login
              </a>
              <a
                href="/auth/join"
                className="block mt-4 lg:inline-block lg:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-500 rounded"
              >
                Join
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
