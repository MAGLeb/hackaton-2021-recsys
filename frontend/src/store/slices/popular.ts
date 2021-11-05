import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../types/common";

export type PopularState = {
  monthData: IBook[];
  englishData: IBook[];
  botanicData: IBook[];
  loading: boolean;
};

const initialState: PopularState = {
  monthData: [],
  englishData: [],
  botanicData: [],
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
      englishData: [],
      botanicData: [],
      loading: true,
    }),
    fetchPopularSuccess: (
      state: PopularState,
      action: PayloadAction<{
        month: IBook[];
        english: IBook[];
        botanic: IBook[];
      }>
    ): PopularState => ({
      ...state,
      loading: false,
      monthData: action.payload?.month || [],
      englishData: action.payload?.english || [],
      botanicData: action.payload?.botanic || [],
    }),
  },
});

export const { fetchPopularFailure, fetchPopularRequest, fetchPopularSuccess } =
  popularSlice.actions;
