"use client";

import { removeToken } from "@/store/slices/authSlice";
import { showSuccessToast } from "@/utils/validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function HeaderAuth({ token }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeToken());
    router.push("/login");
    localStorage.clear();
    showSuccessToast("Logout Successfully..");
    console.log("......");
  };

  return (
    // <div className="hidden lg:block">
    <div className="flex lg:flex">
      {token ? (
        <>
          <Link
            href="/adoptions"
            className="bg-brand-primaryBlue text-white px-6 py-2.5 rounded-xl hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
          >
            Application
          </Link>
          <button
            onClick={handleLogout}
            className="bg-brand-primaryBlue text-white px-6 py-2.5 rounded-xl hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg mx-4"
          >
            Logout
          </button>
        </>
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
