import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UsersState = {
  ids: number[];
  loading: boolean;
};

const initialState: UsersState = {
  ids: [],
  loading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersFailure: (
      state: UsersState,
      action: PayloadAction
    ): UsersState => ({
      ...state,
      loading: false,
    }),
    fetchUsersRequest: (
      state: UsersState,
      action: PayloadAction
    ): UsersState => ({
      ...state,
      loading: true,
    }),
    fetchUsersSuccess: (
      state: UsersState,
      action: PayloadAction<{ ids: number[] }>
    ): UsersState => ({
      ...state,
      loading: false,
      ids: action.payload?.ids || [],
    }),
  },
});

export const { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess } =
  usersSlice.actions;
