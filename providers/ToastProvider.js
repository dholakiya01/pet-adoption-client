"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      autoClose={3000}
      pauseOnHover
    />
  );
}
