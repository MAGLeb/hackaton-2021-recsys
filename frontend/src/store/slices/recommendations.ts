import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../types/common";

export type RecommendationsState = {
  recommendationsData: IBook[];
  historyData: IBook[];
  loading: boolean;
};

const initialState: RecommendationsState = {
  recommendationsData: [],
  historyData: [],
  loading: false,
};

export const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {
    fetchRecommendationsFailure: (
      state: RecommendationsState,
      action: PayloadAction
    ): RecommendationsState => ({
      ...state,
      loading: false,
    }),
    fetchRecommendationsRequest: (
      state: RecommendationsState,
      action: PayloadAction<number | string>
    ): RecommendationsState => ({
      ...state,
      recommendationsData: [],
      historyData: [],
      loading: true,
    }),
    fetchRecommendationsSuccess: (
      state: RecommendationsState,
      action: PayloadAction<{ recommendations: IBook[]; history: IBook[] }>
    ): RecommendationsState => ({
      ...state,
      loading: false,
      recommendationsData: action.payload?.recommendations || [],
      historyData: action.payload?.history || [],
    }),
  },
});

export const {
  fetchRecommendationsFailure,
  fetchRecommendationsRequest,
  fetchRecommendationsSuccess,
} = recommendationsSlice.actions;
