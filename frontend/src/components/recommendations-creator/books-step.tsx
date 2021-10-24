import React from "react";
import { Skeleton } from "antd";
import styles from "./index.module.sass";
import { BooksCarousel } from "../books-carousel";
import { BookWrapper } from "../book-wrapper";
import { IBook } from "../../types/common";

type Props = {
  isLoadingBooks: boolean;
  booksData: IBook[];
  selectedBooks: number[];
  onPick: (value: number) => void;
};

const carouselResponsive = [
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 4,
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 1,
    },
  },
];

export const BooksStep = (props: Props) => {
  const { isLoadingBooks, booksData, selectedBooks, onPick } = props;
  return isLoadingBooks ? (
    <Skeleton active />
  ) : (
    <BooksCarousel responsive={carouselResponsive} slidesToShow={5}>
      {booksData.map((item, inx) => (
        <div
          key={inx}
          className={`${styles.bookBlock} ${
            selectedBooks.includes(item.id) ? styles.selectedBook : undefined
          }`}
          onClick={() => onPick(item.id)}
        >
          <BookWrapper
            book={item}
            popupPlacement="right"
            popupTrigger="hover"
          />
        </div>
      ))}
    </BooksCarousel>
  );
};
