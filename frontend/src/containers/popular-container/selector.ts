import { RootState } from "../../store/types";
import { createSelector } from "reselect";
import { PopularState } from "../../store/slices";
import { IBook } from "../../types/common";

const getPopularState = (state: RootState): PopularState => state.popular;

export const selectMonthData = createSelector<RootState, PopularState, IBook[]>(
  getPopularState,
  (popularState): IBook[] => popularState.monthData
);

export const selectEnglishData = createSelector<
  RootState,
  PopularState,
  IBook[]
>(getPopularState, (popularState): IBook[] => popularState.englishData);

export const selectBotanicData = createSelector<
  RootState,
  PopularState,
  IBook[]
>(getPopularState, (popularState): IBook[] => popularState.botanicData);

export const selectIsPopularLoading = createSelector<
  RootState,
  PopularState,
  boolean
>(getPopularState, (popularState): boolean => popularState.loading);
