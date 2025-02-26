import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetch",
  async ({ page = 1, perPage = 5, filters = {} }, thunkAPI) => {
    try {
      const params = { page, perPage, ...filters };
      const response = await axios.get(`/api/teachers`, { params });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTeachersById = createAsyncThunk(
  "teachers/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/api/teachers/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
