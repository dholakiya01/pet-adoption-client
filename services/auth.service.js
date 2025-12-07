import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const authLogin = async (data) => {
  console.log(data, "Data......");
  const response = await axios.post(`${baseURL}/user/login`, data);
  return response;
};

export const registerUser = async (data) => {
  console.log(data, "Data......");
  const response = await axios.post(`${baseURL}/user/create`, data);
  console.log(response,"Resp[onse....")
  return response;
};
