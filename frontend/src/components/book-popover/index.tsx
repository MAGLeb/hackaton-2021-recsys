import React from "react";
import { Tag } from "antd";
import { IBook } from "../../types/common";
import { Book } from "../book";
import styles from "./index.module.sass";

type Props = {
  book: IBook;
  color: string;
};

export const BookPopover: React.FC<Props> = (props: Props) => {
  const { book, color } = props;
  return (
    <div className={styles.wrapper}>
      <Book book={book} color={color} />
      <div className={styles.description}>
        <div className={styles.annotation}>{book.annotation}</div>
        <div className={styles.age}>{book.year}</div>
        <div className={styles.volume}>{book.volume} страниц</div>
        <div className={styles.tags}>
          {book.rubrics ? (
            <Tag className={styles.tag} color="blue">
              {book.rubrics}
            </Tag>
          ) : null}
        </div>
      </div>
    </div>
  );
};
