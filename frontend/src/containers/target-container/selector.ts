import { RootState } from "../../store/types";
import { createSelector } from "reselect";
import { BooksState } from "../../store/slices";
import { TargetState } from "../../store/slices";
import { IBook } from "../../types/common";

const getBooksState = (state: RootState): BooksState => state.books;

export const selectBooksIds = createSelector<RootState, BooksState, number[]>(
  getBooksState,
  (booksState): number[] => booksState.ids
);

export const selectIsLoadingBooks = createSelector<
  RootState,
  BooksState,
  boolean
>(getBooksState, (booksState): boolean => booksState.loading);

const getTargetState = (state: RootState): TargetState => state.target;

export const selectTargetsData = createSelector<
  RootState,
  TargetState,
  IBook[]
>(getTargetState, (targetState): IBook[] => targetState.targetData);

export const selectIsTargetLoading = createSelector<
  RootState,
  TargetState,
  boolean
>(getTargetState, (targetState): boolean => targetState.loading);
