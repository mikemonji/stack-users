import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StackUser } from "./types";

type State = Record<number, Partial<StackUser>>;

const initialState: State = {};

export const usersPatchSlice = createSlice({
  name: "stackUsersPatch",
  initialState,
  reducers: {
    patchUser: (
      state,
      action: PayloadAction<{ id: number; data: Partial<StackUser> }>
    ) => {
      state[action.payload.id] = {
        ...state[action.payload.id],
        ...action.payload.data,
      };
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      delete state[action.payload];
    },
    resetPatch: () => initialState,
  },
});

export const { patchUser, deleteUser, resetPatch } = usersPatchSlice.actions;
export default usersPatchSlice.reducer;
