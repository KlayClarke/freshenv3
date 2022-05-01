import { useEffect } from "react";
import { Router, useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function ProtectedRouteAgainstAuthUsers({ children }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (status === "authenticated") {
    return null;
  }

  return <>{children}</>;
}
