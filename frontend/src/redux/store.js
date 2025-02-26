import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice.js";
import teacherReducer from "./teachers/slice.js";
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isLoggedIn"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer, teacherReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
