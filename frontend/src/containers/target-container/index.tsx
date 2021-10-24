import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Collapse, Skeleton } from "antd";
import {
  selectTargetsData,
  selectIsTargetLoading,
  selectBooksIds,
  selectIsLoadingBooks,
} from "./selector";
import styles from "./index.module.sass";
import { BooksBlock } from "../../components/books-block";
import { TargetSelect } from "../../components/target-select";
import { fetchTargetRequest } from "../../store/slices";
import { HelpText } from "../../components/help-text";

export const TargetContainer = () => {
  const isLoadingTarget = useSelector(selectIsTargetLoading);
  const booksIds = useSelector(selectBooksIds);
  const isLoadingBooks = useSelector(selectIsLoadingBooks);
  const targetData = useSelector(selectTargetsData);
  const dispatch = useDispatch();
  const content = isLoadingTarget ? (
    <Skeleton active />
  ) : Object.values(targetData).length ? (
    <BooksBlock
      books={targetData}
      title="Фактический выбор пользователя"
      isTarget
    />
  ) : null;

  const onSearch = (ids: number[]) => dispatch(fetchTargetRequest(ids));
  return (
    <Collapse ghost className={styles.collapse}>
      <Collapse.Panel key={1} header={<HelpText />}>
        <React.Fragment>
          <TargetSelect
            targetIds={booksIds}
            isLoadingTargets={isLoadingBooks}
            onSearch={onSearch}
          />
          {content}
        </React.Fragment>
      </Collapse.Panel>
    </Collapse>
  );
};
