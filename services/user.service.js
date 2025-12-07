import axios from "axios";
import axiosInstance from "./api/axiosInstance";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const getallUsers = async () => {
  const res = await axiosInstance.get(`${baseURL}/user/getall`);
  return res;
};

// export const viewByidPets = async (params, data) => {
//   console.log(params, "parms.....");
//   const res = await axios.get(`${baseURL}/pet/viewbyid/${params}`, { data });
//   return res;
// };

// export const createPets = async (data) => {
//   const res = await axiosInstance.post(`${baseURL}/pet/create`, { data });
//   return res;
// };

// export const updatePets = async (params, data) => {
//   console.log(params, "params....");
//   const res = await axiosInstance.put(`${baseURL}/pet/update/${params}`, data);
//   return res;
// };

// export const removePets = async (params, token) => {
//   console.log(params, token, "treafnsd");
//   const res = await axiosInstance.patch(
//     `${baseURL}/pet/soft-delete/${params}`,
//     {
//       headers: {
//         Authorization: token,
//       },
//     }
//   );
//   return res;
// };
