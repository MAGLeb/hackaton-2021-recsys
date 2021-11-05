import React from "react";
import { useSelector } from "react-redux";
import {
  selectMonthData,
  selectBotanicData,
  selectEnglishData,
} from "./selector";

import { BooksBlock } from "../../components/books-block";

export const PopularContainer = () => {
  const monthData = useSelector(selectMonthData);
  const englishData = useSelector(selectEnglishData);
  const botanicData = useSelector(selectBotanicData);
  return (
    <React.Fragment>
      <BooksBlock title="Популярное за месяц" books={monthData} />
      <BooksBlock
        title="Популярные книги по английскому языку"
        books={englishData}
      />
      <BooksBlock title="Популярные книги по ботанике" books={botanicData} />
    </React.Fragment>
  );
};
