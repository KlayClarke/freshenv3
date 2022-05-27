import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProtectedRouteAgainstUnauthUsers from "./UnauthProtectedRouteWrapper";
import ProtectedRouteAgainstAuthUsers from "./AuthProtectedRouteWrapper";

const authRoutes = ["/explore/create"];
const unauthRoutes = ["/auth/join", "/auth/login"];

export default function AuthWrapper({ children }) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  return (
    <>
      {unauthRoutes.includes(router.pathname) ? (
        <>
          <ProtectedRouteAgainstAuthUsers>
            {children}
          </ProtectedRouteAgainstAuthUsers>
        </>
      ) : authRoutes.includes(router.pathname) ? (
        <ProtectedRouteAgainstUnauthUsers>
          {children}
        </ProtectedRouteAgainstUnauthUsers>
      ) : (
        children
      )}
    </>
  );
}
