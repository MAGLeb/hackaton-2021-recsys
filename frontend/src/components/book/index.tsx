import React from "react";
import { Badge } from "antd";
import { BACKGROUND_MAP, BAGES_COLOR_MAP } from "../../constants";
import { IBook } from "../../types/common";

import styles from "./index.module.sass";

type Props = {
  book: IBook;
  color: string;
};

export const Book: React.FC<Props> = (props: Props) => {
  const { id, title, author, year, age_resctriction } = props.book;
  const { color } = props;
  const formedTitle = title || "Название неизвестно";
  const formedAuthor = author || "Автор неизвестен";
  const content = (
    <span
      className={styles.itemImage}
      style={{ background: BACKGROUND_MAP[color] }}
    >
      <div className={styles.imageID}>ID-{id}</div>
      <span className={styles.imageTitle}>{formedTitle}</span>
      <span className={styles.imageAuthor}> {formedAuthor}</span>
    </span>
  );

  return (
    <div
      className={`${styles.item} ${styles.itemText} ${styles.slickSlide}`}
      key={id}
    >
      {age_resctriction ? (
        <Badge.Ribbon
          text={`${age_resctriction}+`}
          color={BAGES_COLOR_MAP[color]}
        >
          {content}
        </Badge.Ribbon>
      ) : (
        content
      )}

      <span className={styles.itemTitle}>{formedTitle}</span>
      <span className={styles.itemAuthor}>{formedAuthor}</span>
    </div>
  );
};
