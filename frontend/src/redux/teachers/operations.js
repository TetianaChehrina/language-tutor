import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetch",
  async ({ page = 1, perPage = 4, filters = {} }, thunkAPI) => {
    try {
      const params = { page, perPage, ...filters };
      const response = await API.get(`/teachers`, { params });

      return {
        teachers: response.data.teachers || [],
        totalPages: response.data.totalPages || 1,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTeachersById = createAsyncThunk(
  "teachers/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await API.get(`/teachers/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
