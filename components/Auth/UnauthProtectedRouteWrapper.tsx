import { useEffect } from "react";
import { Router, useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function ProtectedRouteAgainstUnauthUsers({ children }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}
