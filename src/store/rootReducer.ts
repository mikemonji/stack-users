import { localUsersApi } from "@/features/localUsers/localUsersApi";
import { stackUsersApi } from "@/features/stacjUsers/stackUsersApi";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  [stackUsersApi.reducerPath]: stackUsersApi.reducer,
  [localUsersApi.reducerPath]: localUsersApi.reducer,
});
