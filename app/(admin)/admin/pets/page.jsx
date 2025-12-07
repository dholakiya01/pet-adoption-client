// app/admin/pets/page.jsx
"use client";

import { getAllPets, removePets } from "@/services/pet.service";
import { showErrorToast, showSuccessToast } from "@/utils/validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PetsPage() {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

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
        const getAll = await getAllPets();
        setData(getAll?.data?.data?.data);
      }
    } catch (error) {
      console.log(error, "err");
      showErrorToast(error?.data?.message || "Something went wrong");
    }
  }

  async function handleEdit(id) {
    console.log(id, "id......");
    router.push(`/admin/pets/${id}`);
  }

  useEffect(() => {
    const fetchPets = async () => {
      const getAll = await getAllPets();
      setData(getAll.data.data.data);
    };
    fetchPets();
  }, []);
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
    </div>
  );
}
