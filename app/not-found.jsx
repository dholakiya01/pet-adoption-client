"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-softCream text-center px-4">
      <h1 className="text-6xl font-bold text-brand-primaryBlue mb-4">
        404
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        href="/"
        className="bg-brand-primaryBlue text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}