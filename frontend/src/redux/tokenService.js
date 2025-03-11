import API from "./api.js";

export const setAuthHeader = (token) => {
  API.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  API.defaults.headers.common.Authorization = "";
};

export const getAccessToken = (state) => state?.auth?.accessToken || null;
