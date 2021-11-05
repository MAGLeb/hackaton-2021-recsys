import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModelType } from "../../types/common";

export type ModelState = {
  currentModel: ModelType;
};

const initialState: ModelState = {
  currentModel: ModelType.item_similarity,
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setModelType: (
      state: ModelState,
      action: PayloadAction<ModelType>
    ): ModelState => ({
      ...state,
      currentModel: action.payload,
    }),
  },
});

export const { setModelType } = modelSlice.actions;
