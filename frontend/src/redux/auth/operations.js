import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api.js";
import {
  setAccessToken,
  clearAccessToken,
  getAccessToken,
} from "../tokenService.js";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/register", formData);
      const { accessToken } = data;

      setAccessToken(accessToken);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration error"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", credentials);
      const { accessToken, user } = response.data;
      setAccessToken(accessToken);
      return { user, accessToken };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      if (!token) throw new Error("No access token found");

      await API.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearAccessToken();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout error");
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/auth/refresh");
      const { accessToken, user } = response.data;

      setAccessToken(accessToken);

      return { accessToken, user };
    } catch (error) {
      clearAccessToken();
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);
