import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BooksState = {
  ids: number[];
  loading: boolean;
};

const initialState: BooksState = {
  ids: [],
  loading: false,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    fetchBooksFailure: (
      state: BooksState,
      action: PayloadAction
    ): BooksState => ({
      ...state,
      loading: false,
    }),
    fetchBooksRequest: (
      state: BooksState,
      action: PayloadAction
    ): BooksState => ({
      ...state,
      loading: true,
    }),
    fetchBooksSuccess: (
      state: BooksState,
      action: PayloadAction<{ ids: number[] }>
    ): BooksState => ({
      ...state,
      loading: false,
      ids: action.payload?.ids || [],
    }),
  },
});

export const { fetchBooksFailure, fetchBooksRequest, fetchBooksSuccess } =
  booksSlice.actions;
