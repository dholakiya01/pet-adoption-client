import axios from "axios";
import axiosInstance from "./api/axiosInstance";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getmyApplication = async () => {
  const res = await axiosInstance.get(`${baseURL}/adoption/my-applications`);
  return res;
};

export const getallApplication = async () => {
  const res = await axiosInstance.get(`${baseURL}/adoption/all`);
  return res;
};

export const applyApplication = async () => {
  const res = await axiosInstance.post(`${baseURL}/adoption/apply`);
  return res;
};

export const updateApplicationstatus = async (id) => {
  const res = await axiosInstance.patch(`${baseURL}/adoption/${id}/status`);
  return res;
};
