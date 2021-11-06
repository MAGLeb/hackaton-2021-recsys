import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";
import { selectRecommendationsData, selectHistoryData } from "./selector";
import { fetchRecommendationsRequest } from "../../store/slices";
import {
  selectBooksIds,
  selectIsLoadingBooks,
} from "../target-container/selector";

import { BooksBlock } from "../../components/books-block";

import { AddHistory } from "../../components/add-history";

type Props = {
  setIsHistoryModified: (value: boolean) => void;
};

export const RecommendationsContainer: React.FC<Props> = (props: Props) => {
  const { setIsHistoryModified } = props;
  const recommendations = useSelector(selectRecommendationsData);
  const booksIds = useSelector(selectBooksIds);
  const isLoadingBooks = useSelector(selectIsLoadingBooks);
  const history = useSelector(selectHistoryData);
  const dispatch = useDispatch();

  const historyTitle = (
    <React.Fragment>
      <Typography.Title level={4}>История</Typography.Title>
      <AddHistory
        isLoadingBooks={isLoadingBooks}
        booksIds={booksIds}
        onAdd={(value) => {
          const newIds = [value, ...history.map((item) => item.id)];
          setIsHistoryModified(true);
          dispatch(fetchRecommendationsRequest(newIds));
        }}
      />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <BooksBlock title="Рекомендации" books={recommendations} />
      <BooksBlock title={historyTitle} books={history} />
    </React.Fragment>
  );
};
