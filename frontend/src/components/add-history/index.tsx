import React, { useState } from "react";
import { Collapse, Select, Form, Button } from "antd";
import styles from "./index.module.sass";

const BOOK_ID = "BOOK_ID";
type Props = {
  onAdd: (ids: number[]) => void;
  booksIds: number[];
  isLoadingBooks: boolean;
};

export const AddHistory: React.FC<Props> = (props: Props) => {
  const { onAdd, booksIds, isLoadingBooks } = props;
  const [form] = Form.useForm<{ [BOOK_ID]: number[] }>();
  const [optionsSelected, setOptionsSelected] = useState<number[]>([]);
  const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(true);
  const handleChange = (value) => {
    setOptionsSelected(value);
    if (Array.isArray(value) && value.length) {
      setIsSearchDisabled(false);
    } else {
      setIsSearchDisabled(true);
    }
  };

  const text =
    "Вы можете модифицировать историю и посмотреть, как изменятся рекомендации (изменения не будут сохранены и не повлияют на дальнейшую работу)";
  return (
    <Collapse ghost className={styles.collapse}>
      <Collapse.Panel key={1} header={text}>
        <Form
          form={form}
          className={styles.form}
          layout="inline"
          onFinish={(value) => onAdd(value[BOOK_ID])}
        >
          <Form.Item
            name={BOOK_ID}
            label="Идентификаторы книг для добавления в историю (до 3-x)"
          >
            <Select
              className={styles.select}
              placeholder="Выберите идентификаторы..."
              loading={isLoadingBooks}
              showSearch
              mode="multiple"
              maxTagCount={3}
              onChange={handleChange}
              allowClear
            >
              {booksIds.map((id) => (
                <Select.Option
                  key={id}
                  value={id}
                  disabled={
                    optionsSelected.length > 2
                      ? optionsSelected.includes(id)
                        ? false
                        : true
                      : false
                  }
                >
                  {id}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isSearchDisabled}
            >
              Обновить рекомендации
            </Button>
          </Form.Item>
        </Form>
      </Collapse.Panel>
    </Collapse>
  );
};
