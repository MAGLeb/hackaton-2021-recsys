import React from "react";
import { useSelector } from "react-redux";
import { selectRecommendationsData, selectHistoryData } from "./selector";

import { BooksBlock } from "../../components/books-block";

export const RecommendationsContainer = () => {
  const recommendations = useSelector(selectRecommendationsData);
  const history = useSelector(selectHistoryData);

  return (
    <React.Fragment>
      <BooksBlock title="Рекомендации" books={recommendations} />
      <BooksBlock title="История" books={history} />
    </React.Fragment>
  );
};
