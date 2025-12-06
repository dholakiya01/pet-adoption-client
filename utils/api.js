const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const api = async (url, options = {}) => {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
        ? `Bearer ${localStorage.getItem("token")}`
        : "",
    },
    ...options,
  });

  return res.json();
};