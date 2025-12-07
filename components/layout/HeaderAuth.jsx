"use client";

import Link from "next/link";

export default function HeaderAuth({ token }) {
  return (
    <div className="hidden lg:block">
      {token ? (
        <Link
          href="/application"
          className="bg-brand-primaryBlue text-white px-6 py-2.5 rounded-xl hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
        >
          Application
        </Link>
      ) : (
        <Link
          href="/login"
          className="bg-brand-primaryBlue text-white px-6 py-2.5 rounded-xl hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
        >
          Login
        </Link>
      )}
    </div>
  );
}
