"use client";

import Pagination from "@/components/ui/Pagination";
import { useEffect, useState } from "react";

const STATUS_COLORS = {
  Pending: "text-yellow-600",
  Approved: "text-green-600",
  Rejected: "text-red-600",
};

export default function AdoptionPage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchAdoptions = async () => {
    setLoading(true);

    // ✅ API reference (replace later)
    // /admin/adoptions?page=&search=&status=
    const response = {
      data: [
        {
          _id: "6933087a4005e4a41b446f1b",
          iPetId: { vName: "Dog", vBreed: "uriwjei" },
          iUserId: {
            vEmail: "darshan@gmail.com",
            vPhone: "48417770770",
          },
          vMessage: "mare levu chhe aa",
          vStatus: "Pending",
          iRequestedAt: 1764952186,
        },
        {
          _id: "6933087a4005e4a41b446f1b",
          iPetId: { vName: "Dog", vBreed: "uriwjei" },
          iUserId: {
            vEmail: "darshan@gmail.com",
            vPhone: "48417770770",
          },
          vMessage: "mare levu chhe aa",
          vStatus: "Rejected",
          iRequestedAt: 1764952186,
        },
      ],
      totalPages: 5,
    };

    setData(response.data);
    setTotalPages(response.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAdoptions();
  }, [page, search, status]);

  /* ================= ACTION ================= */
  const updateStatus = async (id, newStatus) => {
    console.log("Update:", id, newStatus);

    // ⚠️ Call API here
    // await api.patch(`/admin/adoption/${id}`, { vStatus: newStatus })

    fetchAdoptions();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Adoption Applications</h1>

      {/* ================= FILTERS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          placeholder="Search by pet or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Pet</th>
              <th className="p-3">User</th>
              <th className="p-3">Message</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {!loading && data.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No records found
                </td>
              </tr>
            )}

            {data.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">
                  <strong>{item.iPetId.vName}</strong>
                  <div className="text-xs text-gray-500">
                    {item.iPetId.vBreed}
                  </div>
                </td>

                <td className="p-3">
                  <div>{item.iUserId.vEmail}</div>
                  <div className="text-xs">{item.iUserId.vPhone}</div>
                </td>

                <td className="p-3 max-w-xs truncate">{item.vMessage}</td>

                <td className={`p-3 ${STATUS_COLORS[item.vStatus]}`}>
                  {item.vStatus}
                </td>

                <td className="p-3 space-x-2">
                  {item.vStatus === "Pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(item._id, "Approved")}
                        className="text-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(item._id, "Rejected")}
                        className="text-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <Pagination
        page={1}
        totalPages={2}
        onPageChange={4}
      />
    </div>
  );
}
