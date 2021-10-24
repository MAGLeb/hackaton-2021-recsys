import React from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import styles from "./index.module.sass";

export const HelpText: React.FC = () => {
  return (
    <span>
      Мы можем помочь вам проверить работу рекомендательной системы для
      выбранного пользователя
      <Tooltip
        title="Вы можете выбрать фактически выбранные пользователем книги и наглядно сопоставить результаты"
        overlayClassName={styles.tooltip}
      >
        <QuestionCircleOutlined className={styles.helpIcon} />
      </Tooltip>
    </span>
  );
};
