import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookType, IBook } from "../../types/common";

export type FilteredBooksState = {
  filteredBooksData: IBook[];
  loading: boolean;
};

const initialState: FilteredBooksState = {
  filteredBooksData: [],
  loading: false,
};

export const filteredBooksSlice = createSlice({
  name: "filteredBooks",
  initialState,
  reducers: {
    fetchFilteredBooksFailure: (
      state: FilteredBooksState,
      action: PayloadAction
    ): FilteredBooksState => ({
      ...state,
      loading: false,
    }),
    fetchFilteredBooksRequest: (
      state: FilteredBooksState,
      action: PayloadAction<{ type: BookType; genres: string[] }>
    ): FilteredBooksState => ({
      ...state,
      filteredBooksData: [],
      loading: true,
    }),
    fetchFilteredBooksSuccess: (
      state: FilteredBooksState,
      action: PayloadAction<{ books: IBook[] }>
    ): FilteredBooksState => ({
      ...state,
      loading: false,
      filteredBooksData: action.payload?.books || [],
    }),
  },
});

export const {
  fetchFilteredBooksFailure,
  fetchFilteredBooksRequest,
  fetchFilteredBooksSuccess,
} = filteredBooksSlice.actions;
