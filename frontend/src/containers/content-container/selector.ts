import { RootState } from "../../store/types";
import { createSelector } from "reselect";
import { ContentModeState } from "../../store/slices";
import { ContentMode } from "../../types/common";
import { selectIsPopularLoading } from "../popular-container/selector";
import { selectIsRecommendationsLoading } from "../recommendations-container/selector";
import { UsersState } from "../../store/slices";

const getContentModeState = (state: RootState): ContentModeState =>
  state.contentMode;

export const selectContentMode = createSelector<
  RootState,
  ContentModeState,
  ContentMode | null
>(
  getContentModeState,
  (contentModeState): ContentMode | null => contentModeState.mode
);

export const selectIsLoadingContent = createSelector<
  RootState,
  boolean,
  boolean,
  boolean
>(
  selectIsRecommendationsLoading,
  selectIsPopularLoading,
  (isRecommendationsLoading, isPopularLoading): boolean =>
    isRecommendationsLoading || isPopularLoading
);

const getUsersState = (state: RootState): UsersState => state.users;

export const selectUsersIds = createSelector<RootState, UsersState, number[]>(
  getUsersState,
  (usersState): number[] => usersState.ids
);

export const selectIsLoadingUsers = createSelector<
  RootState,
  UsersState,
  boolean
>(getUsersState, (usersState): boolean => usersState.loading);
