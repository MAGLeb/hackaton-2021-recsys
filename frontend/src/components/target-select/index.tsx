import React, { useState } from "react";
import { Select, Form, Button } from "antd";

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

  return (
    <Form
      form={form}
      layout="inline"
      className={styles.form}
      onFinish={(value) => onSearch(value[TARGET_SELECT])}
    >
      <Form.Item name={TARGET_SELECT} label="Идентификаторы книг">
        <Select
          className={styles.select}
          placeholder="Выберите идентификаторы..."
          loading={isLoadingTargets}
          showSearch
          mode="multiple"
          maxTagCount={5}
          allowClear
          onChange={(value) => {
            if (Array.isArray(value) && value.length) {
              setIsSearchDisabled(false);
            } else {
              setIsSearchDisabled(true);
            }
          }}
        >
          {targetIds.map((id) => (
            <Select.Option key={id} value={id}>
              {id}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isSearchDisabled}>
          Показать книги
        </Button>
      </Form.Item>
    </Form>
  );
};
