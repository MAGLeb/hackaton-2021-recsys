import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../types/common";

export type PopularState = {
  monthData: IBook[];
  russianData: IBook[];
  newData: IBook[];
  loading: boolean;
};

const initialState: PopularState = {
  monthData: [],
  russianData: [],
  newData: [],
  loading: false,
};

export const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    fetchPopularFailure: (
      state: PopularState,
      action: PayloadAction
    ): PopularState => ({
      ...state,
      loading: false,
    }),
    fetchPopularRequest: (
      state: PopularState,
      action: PayloadAction
    ): PopularState => ({
      ...state,
      monthData: [],
      russianData: [],
      newData: [],
      loading: true,
    }),
    fetchPopularSuccess: (
      state: PopularState,
      action: PayloadAction<{ month: IBook[]; russian: IBook[]; new: IBook[] }>
    ): PopularState => ({
      ...state,
      loading: false,
      monthData: action.payload?.month || [],
      russianData: action.payload?.russian || [],
      newData: action.payload?.new || [],
    }),
  },
});

export const { fetchPopularFailure, fetchPopularRequest, fetchPopularSuccess } =
  popularSlice.actions;
