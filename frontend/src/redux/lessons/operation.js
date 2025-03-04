import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api.js";

export const bookLesson = createAsyncThunk(
  "lessons/book",
  async (lessonData, { rejectWithValue }) => {
    try {
      const response = await API.post("/lessons/book", lessonData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      const response = await API.get(`/teachers/${teacherId}/busy-slots`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch busy slots"
      );
    }
  }
);
