import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { ArticleData } from "../types/ArticleData";

interface PinActicleSliceState {
  pinnedArticle: ArticleData | null;
}

const initialState: PinActicleSliceState = {
  pinnedArticle: null,
};

const pinActicleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    pinActicle: (state, action: PayloadAction<ArticleData>) => {
      state.pinnedArticle = action.payload;
    },
    unpinActicle: (state) => {
      state.pinnedArticle = null;
    }
  }
});

export const { pinActicle, unpinActicle } = pinActicleSlice.actions;

export default pinActicleSlice.reducer;