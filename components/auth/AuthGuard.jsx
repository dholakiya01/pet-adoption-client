"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AuthGuard({ children, allowedRoles }) {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();


  const PUBLIC_ROUTES = ["/", "/pets"];

  useEffect(() => {
    if (PUBLIC_ROUTES.includes(pathname)) return;

    // Not logged in
    if (!token || !user) {
      router.replace("/login");
      return;
    }

    // Role not allowed
    if (!allowedRoles.includes(user.iUserType)) {
      router.replace("/pets");
    }
  }, [router, pathname, allowedRoles]);

  return children;
}
