// app/admin/pets/page.jsx
"use client";

import Link from "next/link";

export default function UserPage() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3">Type</th>
            <th className="p-3">Age (Months)</th>
            <th className="p-3">Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-3">Darshan</td>
            <td className="p-3 text-center">1</td>
            <td className="p-3 text-center">23</td>
            <td className="p-3 text-center">2</td>

            {/* if need deactive */}
            {/* <td className="p-3 space-x-2 text-center">
              <button className="text-red-600">Delete</button>
            </td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
