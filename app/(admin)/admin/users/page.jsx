// app/admin/pets/page.jsx
"use client";

import Input from "@/components/forms/Input";
import Pagination from "@/components/ui/Pagination";
import { getallUsers } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setsearch] = useState("");

  useEffect(() => {
    const fetchuser = async () => {
      const res = await getallUsers({ page, limit, search });
      setData(res.data?.data?.getuser);
      setTotalPages(res?.data?.data?.total?.totalRecords);
    };
    fetchuser();
  }, [page, search]);
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            type="text"
            placeholder={"Search name"}
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
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
              <tr key={i} className="border-t">
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
      {/* ================= PAGINATION ================= */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />{" "}
    </div>
  );
}
