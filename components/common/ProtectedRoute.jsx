"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = false; // from auth
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, []);

  if (!isLoggedIn) return null;

  return children;
}
