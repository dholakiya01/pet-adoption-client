import { getToken, removeToken } from "@/utils/authToken";
import { redirectToLogin } from "@/utils/redirect";
import { showErrorToast } from "@/utils/validators";
import {store} from '../../store/store'

export const setupAuthInterceptor = (axiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;
      console.log(token,"token")

      if (token) {
        config.headers.Authorization = token;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;

      // ✅ Token expired OR not provided
      if (status === 401 || status === 403) {
        removeToken();
        showErrorToast("Session expired. Please login again.");
        redirectToLogin();
      }

      return Promise.reject(error);
    }
  );
};
