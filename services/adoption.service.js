import axios from "axios";
import axiosInstance from "./api/axiosInstance";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getmyApplication = async () => {
  const res = await axiosInstance.get(`${baseURL}/adoption/my-applications`);
  return res;
};

export const getallApplication = async ({ page, limit, status }) => {
  const res = await axiosInstance.get(`${baseURL}/adoption/all`, {
    params: {
      page,
      limit,
      vStatus: status,
    },
  });
  return res;
};

export const applyApplication = async (data) => {
  const res = await axiosInstance.post(`${baseURL}/adoption/apply`, data);
  return res;
};

export const updateApplicationstatus = async (id, data) => {
  const res = await axiosInstance.patch(
    `${baseURL}/adoption/${id}/status`,
    data
  );
  return res;
};
