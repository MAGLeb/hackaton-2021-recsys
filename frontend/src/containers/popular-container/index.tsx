import React from "react";
import { useSelector } from "react-redux";
import { selectMonthData, selectNewData, selectRussianData } from "./selector";

import { BooksBlock } from "../../components/books-block";

export const PopularContainer = () => {
  const monthData = useSelector(selectMonthData);
  const russianData = useSelector(selectRussianData);
  const newData = useSelector(selectNewData);
  return (
    <React.Fragment>
      <BooksBlock title="Популярное за месяц" books={monthData} />
      <BooksBlock title="История России" books={russianData} />
      <BooksBlock title="Популярные новые издания" books={newData} />
    </React.Fragment>
  );
};
