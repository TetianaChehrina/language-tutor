import API from "./api";

let accessToken = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token) => {
  accessToken = token;
  API.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAccessToken = () => {
  accessToken = null;
  delete API.defaults.headers.common.Authorization;
};
