// app/admin/layout.jsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { LucideLogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeToken, setUser } from "@/store/slices/authSlice";
import { showSuccessToast } from "@/utils/validators";

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Pets", path: "/admin/pets" },
    { name: "Adoption", path: "/admin/adoptions" },
  ];

  const handleLogout = () => {
    dispatch(removeToken());
    localStorage.clear();
    showSuccessToast("Logout Successfully..");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <h1 className="text-xl font-bold p-4 border-b">Admin Panel</h1>
        <ul>
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block px-4 py-3 hover:bg-gray-100 ${
                  pathname === item.path ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <Button
          onClick={handleLogout}
          className="mx-4 fixed bottom-14 px-4 py-3 bg-red-600"
        >
          <span className="d-flex"> Logout</span>
        </Button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
