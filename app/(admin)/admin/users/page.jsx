// app/admin/pets/page.jsx
"use client";

import { getallUsers } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchuser = async () => {
      const res = await getallUsers();
      setData(res.data?.data?.getuser);
    };
    fetchuser();
  }, []);
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
            <th className="p-3">Email</th>
            <th className="p-3">Location</th>
          </tr>
        </thead>
        <tbody>
  {data && data.length > 0 ? (
    data.map((item, i) => (
      <tr key={item?._id || i} className="border-t">
        <td className="p-3">{item?.vFullname}</td>
        <td className="p-3 text-center">
          {item?.iUserType === 1 ? "Admin" : "User"}
        </td>
        <td className="p-3 text-center">{item?.iAge}</td>
        <td className="p-3 text-center">{item?.vEmail}</td>
        <td className="p-3 text-center">{item?.vAddress}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center py-20">
        No record found
      </td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
}
