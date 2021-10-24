import React, { useEffect, useState, useRef } from "react";
import { Button } from "antd";
import styles from "./index.module.sass";
import magic from "../../images/magic.png";

import { ModalContent } from "./modal-content";
import { IBook, BookType } from "../../types/common";

type Props = {
  isLoadingGenres: boolean;
  genresData: string[];
  isLoadingFilteredBooks: boolean;
  filteredBooksData: IBook[];
  fetchFilteredBooks: (type: BookType, genres: string[]) => void;
  fetchCreatedRecommendations: (ids: number[]) => void;
  isCreatingRecommendations: boolean;
};

export const RecommendationsCreator = (props: Props) => {
  const {
    isLoadingGenres,
    genresData,
    isLoadingFilteredBooks,
    filteredBooksData,
    fetchFilteredBooks,
    isCreatingRecommendations,
    fetchCreatedRecommendations,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevIsCreating = usePrevious(isCreatingRecommendations);
  useEffect(() => {
    if (prevIsCreating && !isCreatingRecommendations) {
      setIsOpen(false);
    }
  }, [isCreatingRecommendations]);

  return (
    <React.Fragment>
      <Button
        onClick={() => setIsOpen(true)}
        className={styles.creatorBtn}
        type="link"
      >
        Подобрать персональные рекомендации
        <img src={magic} className={styles.magicImg} alt="" />
      </Button>
      {isOpen ? (
        <ModalContent
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          genresData={genresData}
          isLoadingGenres={isLoadingGenres}
          isLoadingFilteredBooks={isLoadingFilteredBooks}
          filteredBooksData={filteredBooksData}
          fetchFilteredBooks={fetchFilteredBooks}
          isCreatingRecommendations={isCreatingRecommendations}
          fetchCreatedRecommendations={fetchCreatedRecommendations}
        />
      ) : null}
    </React.Fragment>
  );
};
