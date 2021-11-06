import React, { useState } from "react";
import { Select, Form, Button, Skeleton } from "antd";

import styles from "./index.module.sass";

type Props = {
  onSearch: (ids: number[]) => void;
  targetIds: number[];
  isLoadingTargets: boolean;
};

const TARGET_SELECT = "TARGET_SELECT";

export const TargetSelect: React.FC<Props> = (props: Props) => {
  const { targetIds, isLoadingTargets, onSearch } = props;
  const [form] = Form.useForm<{ [TARGET_SELECT]: number[] }>();
  const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(true);
  const onChange = (value) => {
    form.validateFields([TARGET_SELECT]);
    if (Array.isArray(value) && value.length) {
      setIsSearchDisabled(false);
    } else {
      setIsSearchDisabled(true);
    }
  };

  return isLoadingTargets ? (
    <Skeleton active paragraph={{ rows: 1 }} />
  ) : (
    <Form
      form={form}
      layout="inline"
      className={styles.form}
      onFinish={(value) => onSearch(value[TARGET_SELECT])}
    >
      <Form.Item
        name={TARGET_SELECT}
        label="Идентификаторы книг"
        rules={[
          {
            validator: () => {
              const values = form.getFieldValue(TARGET_SELECT);
              const invalidIds: any[] = [];
              values?.forEach((item: string) => {
                if (!targetIds.includes(Number(item))) {
                  invalidIds.push(item);
                }
              });
              return invalidIds.length
                ? Promise.reject(
                    `${
                      invalidIds.length > 1 ? "Книг" : "Книги"
                    } с айди ${invalidIds.join(", ")} не существует`
                  )
                : Promise.resolve();
            },
          },
        ]}
      >
        <Select
          placeholder="Введите айди через запятую..."
          mode="tags"
          tokenSeparators={[",", " "]}
          notFoundContent={null}
          onChange={onChange}
          className={styles.select}
        ></Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isSearchDisabled}>
          Показать книги
        </Button>
      </Form.Item>
    </Form>
  );
};
