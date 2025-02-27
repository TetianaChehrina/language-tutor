import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachers, fetchTeachersById } from "./operations";

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    teacher: {},
    page: 1,
    totalPages: 0,
    favorites: [],
    filters: {
      languages: [],
      levels: [],
      popular: null,
      price: null,
      search: "",
    },
    isLoading: false,
    isError: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1;
      state.teachers = [];
    },
    resetFilters: (state) => {
      state.filters = {
        languages: [],
        levels: [],
        popular: null,
        price: null,
        search: "",
      };
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        if (state.page === 1) {
          state.teachers = action.payload.teachers;
        } else {
          state.teachers = [...state.teachers, ...action.payload.teachers];
        }
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchTeachersById.fulfilled, (state, action) => {
        state.teacher = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(fetchTeachersById.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { setFilters, resetFilters, addToFavorites, setPage } =
  teacherSlice.actions;
export default teacherSlice.reducer;
