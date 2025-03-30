import { configureStore } from "@reduxjs/toolkit";
import { stackUsersApi } from "@/features/stacjUsers/stackUsersApi";
import { rootReducer } from "./rootReducer";
import { persistStore } from "redux-persist";
import { persistReducer } from "./persist";

export const store = configureStore({
  reducer: persistReducer(rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(stackUsersApi.middleware),
});

export const persistor = persistStore(store);
