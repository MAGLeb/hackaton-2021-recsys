import { RootState } from "../../store/types";
import { createSelector } from "reselect";
import { RecommendationsState } from "../../store/slices";
import { IBook } from "../../types/common";

const getRecommendationsState = (state: RootState): RecommendationsState =>
  state.recommendations;

export const selectRecommendationsData = createSelector<
  RootState,
  RecommendationsState,
  IBook[]
>(
  getRecommendationsState,
  (recommendationsState): IBook[] => recommendationsState.recommendationsData
);

export const selectHistoryData = createSelector<
  RootState,
  RecommendationsState,
  IBook[]
>(
  getRecommendationsState,
  (recommendationsState): IBook[] => recommendationsState.historyData
);

export const selectIsRecommendationsLoading = createSelector<
  RootState,
  RecommendationsState,
  boolean
>(
  getRecommendationsState,
  (recommendationsState): boolean => recommendationsState.loading
);
