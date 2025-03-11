import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api.js";
import { setAuthHeader, clearAuthHeader } from "../tokenService.js";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/register", formData);
      const { accessToken, user } = data;

      setAuthHeader(accessToken);

      return { user, accessToken };
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
      setAuthHeader(accessToken);
      return { user, accessToken };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await API.post("/auth/logout");
      clearAuthHeader();
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout error"
      );
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/auth/refresh", {
        withCredentials: true,
      });

      const { accessToken, user } = response.data;

      setAuthHeader(accessToken);

      return { user, accessToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Refresh failed"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.put("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update profile"
      );
    }
  }
);
