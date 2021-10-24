import React, { useState } from "react";
import { Skeleton, Select } from "antd";
import styles from "./index.module.sass";

type Props = {
  isLoadingGenres: boolean;
  genresData: string[];
  selectedGenres: string[];
  onChange: (value: string[]) => void;
};

export const GenresStep = (props: Props) => {
  const { isLoadingGenres, genresData, selectedGenres, onChange } = props;
  const [optionsSelected, setOptionsSelected] = useState<string[]>([]);
  const handleChange = (value) => {
    setOptionsSelected(value);
    onChange(value);
  };
  return isLoadingGenres ? (
    <Skeleton active />
  ) : (
    <div className={styles.genresContent}>
      <div className={styles.helpText}>*Вы можете выбрать до 7-ми жанров</div>
      <Select
        placeholder="Выберите жанры..."
        onChange={handleChange}
        mode="multiple"
        className={styles.genresSelect}
        loading={isLoadingGenres}
        value={selectedGenres as any}
      >
        {genresData?.length
          ? genresData
              .slice()
              .sort((one, two) => one.localeCompare(two))
              .map((item, inx) => (
                <Select.Option
                  key={inx}
                  value={item}
                  disabled={
                    optionsSelected.length > 6
                      ? optionsSelected.includes(item)
                        ? false
                        : true
                      : false
                  }
                >
                  {item}
                </Select.Option>
              ))
          : null}
      </Select>
    </div>
  );
};
