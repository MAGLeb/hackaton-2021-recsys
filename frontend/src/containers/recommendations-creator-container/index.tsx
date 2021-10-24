import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BooksBlock } from "../../components/books-block";

import { RecommendationsCreator } from "../../components/recommendations-creator";
import {
  fetchCreatedRecommendationsRequest,
  fetchFilteredBooksRequest,
} from "../../store/slices";
import { BookType } from "../../types/common";
import {
  selectCreatedRecommendations,
  selectCreatedRecommendationsHistory,
  selectFilteredBooksData,
  selectGenresData,
  selectIsCreatedRecommendationsLoading,
  selectIsFilteredBooksLoading,
  selectIsLoadingGenres,
} from "./selector";

export const RecommendationsCreatorContainer = () => {
  const genresData = useSelector(selectGenresData);
  const isLoadingGenres = useSelector(selectIsLoadingGenres);
  const isLoadingFilteredBooks = useSelector(selectIsFilteredBooksLoading);
  const filteredBooksData = useSelector(selectFilteredBooksData);
  const isCreatingRecommendations = useSelector(
    selectIsCreatedRecommendationsLoading
  );
  const createdRecommendationsData = useSelector(selectCreatedRecommendations);
  const createdRecommendationsHistory = useSelector(
    selectCreatedRecommendationsHistory
  );
  const dispatch = useDispatch();

  return createdRecommendationsData.length ? (
    <React.Fragment>
      <BooksBlock
        books={createdRecommendationsData}
        title="Ваши персональные рекомендации"
        popupPlacement="right"
      />
      <BooksBlock
        books={createdRecommendationsHistory}
        title="История выбранных вами книг"
      />
    </React.Fragment>
  ) : (
    <RecommendationsCreator
      genresData={genresData}
      isLoadingGenres={isLoadingGenres}
      isLoadingFilteredBooks={isLoadingFilteredBooks}
      filteredBooksData={filteredBooksData}
      fetchFilteredBooks={(type: BookType, genres: string[]) =>
        dispatch(fetchFilteredBooksRequest({ type, genres }))
      }
      isCreatingRecommendations={isCreatingRecommendations}
      fetchCreatedRecommendations={(ids) =>
        dispatch(fetchCreatedRecommendationsRequest(ids))
      }
    />
  );
};
