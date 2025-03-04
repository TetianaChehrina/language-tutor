import { createSelector } from "@reduxjs/toolkit";

export const selectBusySlots = (state) => state.lessons.busySlots;

export const selectLessonsState = (state) => state.lessons;

export const selectPlannedLessons = createSelector(
  selectLessonsState,
  (lessons) => lessons.plannedLessons
);

export const selectCompletedLessons = createSelector(
  selectLessonsState,
  (lessons) => lessons.completedLessons
);

export const selectLessonsLoading = createSelector(
  selectLessonsState,
  (lessons) => lessons.loading
);

export const selectLessonsError = createSelector(
  selectLessonsState,
  (lessons) => lessons.error
);
