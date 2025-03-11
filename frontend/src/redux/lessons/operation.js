import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api.js";

export const bookLesson = createAsyncThunk(
  "lessons/book",
  async (lessonData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;

      if (!token) {
        return thunkAPI.rejectWithValue("No access token found");
      }

      const response = await API.post("/lessons/book", lessonData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Booking failed"
      );
    }
  }
);

export const fetchLessons = createAsyncThunk(
  "lessons/fetchLessons",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await API.get(`/lessons`, {
        params: { userId, role },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  "lessons/deleteLesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      await API.delete(`/lessons/${lessonId}`);
      return lessonId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const completeLesson = createAsyncThunk(
  "lessons/completeLesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = API.put(`/lessons/complete/${lessonId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBusySlots = createAsyncThunk(
  "lessons/fetchBusySlots",
  async (teacherId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/lessons/${teacherId}/busy-slots`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch busy slots"
      );
    }
  }
);
