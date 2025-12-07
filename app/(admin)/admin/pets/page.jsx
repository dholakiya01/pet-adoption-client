// app/admin/pets/page.jsx
"use client";

import Input from "@/components/forms/Input";
import Pagination from "@/components/ui/Pagination";
import { getAllPets, removePets } from "@/services/pet.service";
import { showErrorToast, showSuccessToast } from "@/utils/validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PetsPage() {
  const token = useSelector((state) => state.auth.token);

  const router = useRouter();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setsearch] = useState("");

  const sortype = (value) => {
    if (value == 1) {
      return "Dog";
    }
  };

  async function handleDelete(id) {
    try {
      const res = await removePets(id, token);
      console.log(res, "Res....");
      if (res.status === 200) {
        showSuccessToast(res.data.message || "Pet remove successfully");
        const getAll = await getAllPets({ page, limit, search });
        setData(getAll?.data?.data?.data);
      }
    } catch (error) {
      console.log(error, "err");
      showErrorToast(error?.data?.message || "Something went wrong");
    }
  }

  async function handleEdit(id) {
    router.push(`/admin/pets/${id}`);
  }

  useEffect(() => {
    const fetchPets = async () => {
      const getAll = await getAllPets({ page, limit, search });
      setData(getAll.data.data?.data);
      setTotalPages(getAll?.data?.data?.total?.totalRecords);
    };
    fetchPets();
  }, [search, page]);
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Pets</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            type="text"
            placeholder={"Search pet"}
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
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
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, i) => {
            return (
              <tr className="border-t" key={i}>
                <td className="p-3">
                  <img
                    src={`${process.env.NEXT_PUBLIC_PORT}${item?.image}`}
                    width={50}
                    height={100}
                    alt={item?.vName}
                  />
                </td>
                <td className="p-3">{item?.vName}</td>
                <td className="p-3 text-center">{sortype(item.iType)}</td>
                <td className="p-3 text-center">{item?.vBreed}</td>
                <td className="p-3 text-center">{item?.iAgeMonths}</td>
                <td className="p-3 text-center">
                  {item?.iGender == 1 ? "Male" : "Female"}
                </td>
                <td className="p-3 text-center">{item?.vDescription} </td>
                <td className="p-3 space-x-2 text-center">
                  <button
                    onClick={() => {
                      handleEdit(item?._id);
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(item?._id);
                    }}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
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
