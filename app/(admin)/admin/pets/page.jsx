// app/admin/pets/page.jsx
"use client";

import Link from "next/link";

export default function PetsPage() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Pets</h2>
        <Link
          href="/admin/pets/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Pet
        </Link>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Pet Name</th>
            <th className="p-3">Type</th>
            <th className="p-3">Breed</th>
            <th className="p-3">Age/Month</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-3">-</td>
            <td className="p-3">Dog</td>
            <td className="p-3 text-center">Dog</td>
            <td className="p-3 text-center">10</td>
            <td className="p-3 text-center">Male</td>
            <td className="p-3 text-center">diasjdiahfisfin </td>
            <td className="p-3 space-x-2 text-center">
              <Link href="/admin/pets/edit/1" className="text-blue-600">
                Edit
              </Link>
              <button className="text-red-600">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
