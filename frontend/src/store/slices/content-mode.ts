import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentMode } from "../../types/common";

export type ContentModeState = {
  mode: ContentMode | null;
};

const initialState: ContentModeState = {
  mode: null,
};

export const contentModeSlice = createSlice({
  name: "contentMode",
  initialState,
  reducers: {
    setContentMode: (
      state: ContentModeState,
      action: PayloadAction<ContentMode>
    ): ContentModeState => ({
      ...state,
      mode: action.payload,
    }),
  },
});

export const { setContentMode } = contentModeSlice.actions;
