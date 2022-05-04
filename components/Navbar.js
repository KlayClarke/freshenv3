import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    setCurrentRoute(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    setIsNavOpen(false);
  }, [currentRoute]);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white border-b border-gray-300 px-6 py-2 top-0 left-0 right-0 sticky z-10">
      <div className="flex items-center flex-shrink-0 text-blue-500 mr-6">
        <Link href="/">
          <a className="font-semibold text-3xl tracking-tight">freshen</a>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="flex items-center px-3 py-2 border rounded bg-blue-500 text-white border-white  hover:text-blue-500 hover:bg-white hover:border-blue-500"
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
          <Link href="/explore">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-500 mr-4">
              Explore
            </a>
          </Link>
          {status == "authenticated" ? (
            <>
              <button
                onClick={() => {
                  signOut({
                    callbackUrl: process.env.NEXT_PUBLIC_SITE_URL,
                  });
                }}
                className="block mt-4 lg:inline-block lg:mt-0 btn bg-blue-500 hover:bg-blue-600 text-white font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-500 mr-4">
                  Login
                </a>
              </Link>
              <Link href="/auth/join">
                <a className="block mt-4 lg:inline-block lg:mt-0 btn bg-blue-500 hover:bg-blue-600 text-white font-semibold">
                  Join
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
