import React, { useState } from "react";
import { Button, Steps, Typography } from "antd";
import styles from "./index.module.sass";
import { BookType } from "../../types/common";
import { TypeStep } from "./type-step";
import { GenresStep } from "./genres-step";
import { IBook } from "../../types/common";
import { BooksStep } from "./books-step";

const { Step } = Steps;

type Props = {
  isLoadingGenres: boolean;
  genresData: string[];
  isLoadingFilteredBooks: boolean;
  filteredBooksData: IBook[];
  fetchFilteredBooks: (type: BookType, genres: string[]) => void;
  isCreatingRecommendations: boolean;
  fetchCreatedRecommendations: (ids: number[]) => void;
};

export const StepsBlock = (props: Props) => {
  const {
    isLoadingGenres,
    genresData,
    isLoadingFilteredBooks,
    filteredBooksData,
    fetchFilteredBooks,
    isCreatingRecommendations,
    fetchCreatedRecommendations,
  } = props;

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<BookType | undefined>(
    undefined
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const steps = [
    {
      title: "Тип",
      content: (
        <TypeStep
          currentType={selectedType}
          onSelect={(type) => setSelectedType(type)}
        />
      ),
      header: "Выберите тип литературы",
    },
    {
      title: "Жанры",
      content: (
        <GenresStep
          isLoadingGenres={isLoadingGenres}
          genresData={genresData}
          selectedGenres={selectedGenres}
          onChange={(value) => {
            setSelectedGenres(value);
          }}
        />
      ),
      header: "Выберите интересные жанры",
    },
    {
      title: "Книги",
      content: (
        <BooksStep
          isLoadingBooks={isLoadingFilteredBooks}
          booksData={filteredBooksData}
          onPick={(value) => {
            let newSelectedBooks;
            if (selectedBooks.includes(value)) {
              newSelectedBooks = selectedBooks.filter((item) => item !== value);
            } else {
              newSelectedBooks = [...selectedBooks, value];
            }
            setSelectedBooks(newSelectedBooks);
          }}
          selectedBooks={selectedBooks}
        />
      ),
      header: "Выберите книги, которые вам нравятся",
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };
  const getIsNextDisabled = () => {
    if (currentStep === 0 && !selectedType) {
      return true;
    }
    if (currentStep === 1 && !selectedGenres.length) {
      return true;
    }
    if (currentStep === 2 && !selectedBooks.length) {
      return true;
    }
    return false;
  };

  const onNextClick = () => {
    if (currentStep === 1) {
      setSelectedBooks([]);
      fetchFilteredBooks(selectedType as BookType, selectedGenres);
    }
    if (currentStep === 2) {
      fetchCreatedRecommendations(selectedBooks);
    } else {
      next();
    }
  };

  return (
    <React.Fragment>
      <Steps current={currentStep} progressDot>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div className={styles.stepsContent}>
        <Typography.Title level={4} className={styles.stepHeader}>
          {steps[currentStep].header}
        </Typography.Title>
        {steps[currentStep].content}
      </div>
      <div className={styles.stepBtns}>
        {currentStep > 0 && <Button onClick={() => prev()}>Назад</Button>}
        <Button
          type="primary"
          onClick={onNextClick}
          className={styles.stepBtnNext}
          disabled={getIsNextDisabled()}
          loading={currentStep === 2 && isCreatingRecommendations}
        >
          {currentStep === steps.length - 1
            ? "Подобрать рекомендации"
            : "Далее"}
        </Button>
      </div>
    </React.Fragment>
  );
};
