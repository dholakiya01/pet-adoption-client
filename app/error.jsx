"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-softCream px-4 text-center">
      <h1 className="text-4xl font-bold text-brand-primaryBlue mb-3">
        Something went wrong
      </h1>

      <p className="text-gray-700 mb-6 max-w-md">
        We encountered an unexpected error. Please try again or return to the
        home page.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-brand-primaryBlue text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="border border-brand-primaryBlue text-brand-primaryBlue px-5 py-2.5 rounded-xl hover:bg-brand-primaryBlue hover:text-white transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
