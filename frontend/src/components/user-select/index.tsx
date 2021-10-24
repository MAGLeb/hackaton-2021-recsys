import React, { useEffect } from "react";
import { Select, Form, Button, Input } from "antd";

import styles from "./index.module.sass";

type Props = {
  onPredict: (id: number | undefined) => void;
  isLoadingUsers: boolean;
  value: number | undefined;
};

const USER_INPUT = "USER_INPUT";

export const UserSelect: React.FC<Props> = (props: Props) => {
  const { isLoadingUsers, onPredict, value } = props;
  const [form] = Form.useForm<{ [USER_INPUT]: number | undefined }>();
  useEffect(() => {
    form.setFieldsValue({ [USER_INPUT]: value });
  }, [value]);

  return (
    <Form
      form={form}
      layout="inline"
      className={styles.form}
      onFinish={(value) => onPredict(value[USER_INPUT])}
    >
      <div className={styles.helpText}>
        *Пустое поле означает, что пользователь неаутентифицирован
      </div>
      <Form.Item
        name={USER_INPUT}
        label="Идентификатор пользователя"
        rules={[
          {
            pattern: /^(?:\d*)$/,
            message: "Значение должно быть числом",
          },
        ]}
      >
        <Input
          placeholder="Введите айди или оставьте пустым..."
          className={styles.input}
          allowClear
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isLoadingUsers}
          loading={isLoadingUsers}
        >
          Получить рекомендации
        </Button>
      </Form.Item>
    </Form>
  );
};
