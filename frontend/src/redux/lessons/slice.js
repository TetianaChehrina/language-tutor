import { createSlice } from "@reduxjs/toolkit";
import {
  bookLesson,
  completeLesson,
  deleteLesson,
  fetchBusySlots,
  fetchLessons,
} from "./operation";

const initialState = {
  plannedLessons: [],
  completedLessons: [],
  loading: false,
  error: null,
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusySlots.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusySlots.fulfilled, (state, action) => {
        state.loading = false;
        state.busySlots = action.payload;
      })
      .addCase(fetchBusySlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.plannedLessons.push(action.payload);
      })
      .addCase(bookLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.plannedLessons = action.payload.planned || [];
        state.completedLessons = action.payload.completed || [];
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.plannedLessons = state.plannedLessons.filter(
          (lesson) => lesson._id !== action.payload
        );
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(completeLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeLesson.fulfilled, (state, action) => {
        state.loading = false;
        const completedLesson = action.payload;
        state.plannedLessons = state.plannedLessons.filter(
          (lesson) => lesson._id !== completedLesson._id
        );
        state.completedLessons.push(completedLesson);
      })
      .addCase(completeLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default lessonsSlice.reducer;
