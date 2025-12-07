import { toast } from "react-hot-toast";

export const showErrorToast = (message) => {
  toast.error(message || "Something went wrong");
};

export const showSuccessToast = (message) => {
  toast.success(message || "Success.");
};