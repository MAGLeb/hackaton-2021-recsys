import React, { useState } from "react";
import { Collapse, Select, Form, Button, Input, Skeleton } from "antd";
import styles from "./index.module.sass";

const BOOK_ID = "BOOK_ID";
type Props = {
  onAdd: (id: number) => void;
  booksIds: number[];
  isLoadingBooks: boolean;
};

export const AddHistory: React.FC<Props> = (props: Props) => {
  const { onAdd, booksIds, isLoadingBooks } = props;
  const [form] = Form.useForm<{ [BOOK_ID]: number }>();
  const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(true);
  const text =
    "Вы можете модифицировать историю и посмотреть, как изменятся рекомендации (изменения не будут сохранены и не повлияют на дальнейшую работу)";
  return (
    <Collapse ghost className={styles.collapse} destroyInactivePanel>
      <Collapse.Panel key={1} header={text}>
        {isLoadingBooks ? (
          <Skeleton active paragraph={{ rows: 1 }} />
        ) : (
          <Form
            form={form}
            className={styles.form}
            layout="inline"
            onFinish={(value) => onAdd(value[BOOK_ID])}
          >
            <Form.Item
              name={BOOK_ID}
              label="Идентификатор книги для добавления в историю"
              rules={[
                {
                  validator: () => {
                    const id = form.getFieldValue(BOOK_ID);
                    return !id || booksIds.includes(Number(id))
                      ? Promise.resolve()
                      : Promise.reject(`Книги с айди ${id} не существует`);
                  },
                },
              ]}
            >
              <Input
                placeholder="Выберите идентификатор..."
                className={styles.input}
                autoComplete="off"
                onChange={(event) => {
                  if (event?.target?.value?.length) {
                    setIsSearchDisabled(false);
                  } else {
                    setIsSearchDisabled(true);
                  }
                }}
              />
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
        )}
      </Collapse.Panel>
    </Collapse>
  );
};
