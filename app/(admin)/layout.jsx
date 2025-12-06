// app/admin/layout.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menu = [
    // { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Pets", path: "/admin/pets" },
    { name: "Adoption", path: "/admin/adoptions" },
  ];

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
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
