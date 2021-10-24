import { RootState } from "../../store/types";
import { createSelector } from "reselect";
import { GenresState } from "../../store/slices";
import {
  FilteredBooksState,
  CreatedRecommendationsState,
} from "../../store/slices";
import { IBook } from "../../types/common";

const getGenresState = (state: RootState): GenresState => state.genres;

export const selectGenresData = createSelector<
  RootState,
  GenresState,
  string[]
>(getGenresState, (genresState): string[] => genresState.genresData);

export const selectIsLoadingGenres = createSelector<
  RootState,
  GenresState,
  boolean
>(getGenresState, (genresState): boolean => genresState.loading);

const getFilteredBooksState = (state: RootState): FilteredBooksState =>
  state.filteredBooks;

export const selectFilteredBooksData = createSelector<
  RootState,
  FilteredBooksState,
  IBook[]
>(
  getFilteredBooksState,
  (filteredBooksState): IBook[] => filteredBooksState.filteredBooksData
);

export const selectIsFilteredBooksLoading = createSelector<
  RootState,
  FilteredBooksState,
  boolean
>(
  getFilteredBooksState,
  (filteredBooksState): boolean => filteredBooksState.loading
);

const getCreatedRecommendationsState = (
  state: RootState
): CreatedRecommendationsState => state.createdRecommendations;

export const selectIsCreatedRecommendationsLoading = createSelector<
  RootState,
  CreatedRecommendationsState,
  boolean
>(
  getCreatedRecommendationsState,
  (createdRecState): boolean => createdRecState.loading
);

export const selectCreatedRecommendations = createSelector<
  RootState,
  CreatedRecommendationsState,
  IBook[]
>(
  getCreatedRecommendationsState,
  (createdRecState): IBook[] => createdRecState.createdRecommendationsData
);

export const selectCreatedRecommendationsHistory = createSelector<
  RootState,
  CreatedRecommendationsState,
  IBook[]
>(
  getCreatedRecommendationsState,
  (createdRecState): IBook[] => createdRecState.createdRecommendationsHistory
);
