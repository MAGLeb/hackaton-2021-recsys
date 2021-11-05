import React from "react";
import { Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styles from "./index.module.sass";

export const ModifiedHistoryInfo: React.FC = () => (
  <Typography.Title level={4} className={styles.typography}>
    <InfoCircleOutlined className={styles.icon} />
    История данного пользователя была модифицированна
  </Typography.Title>
);
