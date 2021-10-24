import React from "react";
import { Radio } from "antd";
import { BookType } from "../../types/common";

type Props = {
  onSelect: (type: BookType) => void;
  currentType: BookType | undefined;
};

export const TypeStep = (props: Props) => {
  const { onSelect, currentType } = props;
  return (
    <Radio.Group
      value={currentType}
      onChange={(event) => onSelect(event.target.value)}
      size="large"
    >
      <Radio.Button value={BookType.classic}>Классическая</Radio.Button>
      <Radio.Button value={BookType.modern}>Современная</Radio.Button>
    </Radio.Group>
  );
};
