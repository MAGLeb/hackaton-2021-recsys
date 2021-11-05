import React, { useState } from "react";
import { Form, Radio } from "antd";
import { ModelType } from "../../types/common";

type Props = {
  currentValue: ModelType;
  handleChange: (value: ModelType) => void;
};

export const ModelRadio: React.FC<Props> = (props: Props) => {
  const { currentValue, handleChange } = props;

  const onChange = (e) => {
    handleChange(e.target.value);
  };

  return (
    <Form.Item label="Используемая модель">
      <Radio.Group onChange={onChange} value={currentValue}>
        <Radio value={ModelType.item_similarity}>
          Item Similarity based on user interactions
        </Radio>
        <Radio value={ModelType.rnn}>Recurrent Neural Network</Radio>
        <Radio value={ModelType.bert}>
          BERT Neural Network (long prediction)
        </Radio>
        <Radio value={ModelType.random}>Random</Radio>
      </Radio.Group>
    </Form.Item>
  );
};
