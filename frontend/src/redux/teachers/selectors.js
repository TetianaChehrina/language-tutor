export const selectTeachers = (state) => state.teachers.teachers || null;
export const selectTeacher = (state) => state.teachers.teacher;
export const selectPage = (state) => state.teachers.page;
export const selectTotalPages = (state) => state.teachers.totalPages;
export const selectFavorites = (state) => state.teachers.favorites;
export const selectFilters = (state) => state.teachers.filters;
export const selectIsLoading = (state) => state.teachers.isLoading;
export const selectIsError = (state) => state.teachers.isError;
