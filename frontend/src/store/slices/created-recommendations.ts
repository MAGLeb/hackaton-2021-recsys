import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../types/common";

export type CreatedRecommendationsState = {
  createdRecommendationsData: IBook[];
  createdRecommendationsHistory: IBook[];
  loading: boolean;
};

const initialState: CreatedRecommendationsState = {
  createdRecommendationsData: [],
  createdRecommendationsHistory: [],
  loading: false,
};

export const createdRecommendationsSlice = createSlice({
  name: "createdRecommendations",
  initialState,
  reducers: {
    fetchCreatedRecommendationsFailure: (
      state: CreatedRecommendationsState,
      action: PayloadAction
    ): CreatedRecommendationsState => ({
      ...state,
      loading: false,
    }),
    fetchCreatedRecommendationsRequest: (
      state: CreatedRecommendationsState,
      action: PayloadAction<number[]>
    ): CreatedRecommendationsState => ({
      ...state,
      createdRecommendationsData: [],
      createdRecommendationsHistory: [],
      loading: true,
    }),
    fetchCreatedRecommendationsSuccess: (
      state: CreatedRecommendationsState,
      action: PayloadAction<{ recommendations: IBook[]; history: IBook[] }>
    ): CreatedRecommendationsState => {
      return {
        ...state,
        loading: false,
        createdRecommendationsData: action.payload?.recommendations || [],
        createdRecommendationsHistory: action.payload?.history || [],
      };
    },
  },
});

export const {
  fetchCreatedRecommendationsFailure,
  fetchCreatedRecommendationsRequest,
  fetchCreatedRecommendationsSuccess,
} = createdRecommendationsSlice.actions;
