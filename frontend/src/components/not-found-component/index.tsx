import React from "react";
import { Result } from "antd";
import styles from "./index.module.sass";

export const NotFoundComponent = () => (
  <div className={styles.notFound}>
    <Result status="404" title="404" subTitle="Данный пользователь не найден" />
  </div>
);
