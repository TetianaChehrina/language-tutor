import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice.js";
import teachersReducer from "./teachers/slice.js";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isLoggedIn", "favorites"],
};

const teachersPersistConfig = {
  key: "teachers",
  storage,
  whitelist: ["favorites"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedTeachersReducer = persistReducer(
  teachersPersistConfig,
  teachersReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    teachers: persistedTeachersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
