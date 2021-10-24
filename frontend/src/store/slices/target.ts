import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../types/common";

export type TargetState = {
  targetData: IBook[];
  loading: boolean;
};

const initialState: TargetState = {
  targetData: [],
  loading: false,
};

export const targetSlice = createSlice({
  name: "target",
  initialState,
  reducers: {
    fetchTargetFailure: (
      state: TargetState,
      action: PayloadAction
    ): TargetState => ({
      ...state,
      loading: false,
    }),
    fetchTargetRequest: (
      state: TargetState,
      action: PayloadAction<number[]>
    ): TargetState => ({
      ...state,
      targetData: [],
      loading: true,
    }),
    fetchTargetSuccess: (
      state: TargetState,
      action: PayloadAction<{ target: IBook[] }>
    ): TargetState => ({
      ...state,
      loading: false,
      targetData: action.payload?.target || [],
    }),
  },
});

export const { fetchTargetFailure, fetchTargetRequest, fetchTargetSuccess } =
  targetSlice.actions;
