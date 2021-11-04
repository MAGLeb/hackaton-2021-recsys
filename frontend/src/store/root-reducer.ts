import { combineReducers } from "@reduxjs/toolkit";
import {
  recommendationsSlice,
  popularSlice,
  contentModeSlice,
  booksSlice,
  targetSlice,
  genresSlice,
  createdRecommendationsSlice,
  filteredBooksSlice,
} from "./slices";

export default combineReducers({
  recommendations: recommendationsSlice.reducer,
  popular: popularSlice.reducer,
  contentMode: contentModeSlice.reducer,
  books: booksSlice.reducer,
  target: targetSlice.reducer,
  genres: genresSlice.reducer,
  filteredBooks: filteredBooksSlice.reducer,
  createdRecommendations: createdRecommendationsSlice.reducer,
});
