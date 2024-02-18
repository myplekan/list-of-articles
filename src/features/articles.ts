import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { ArticleData } from "../types/ArticleData";

interface ArticleSliceState {
  articles: ArticleData[];
}

const initialState: ArticleSliceState = {
  articles: [],
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<ArticleData[]>) => {
      state.articles = action.payload;
    }
  }
});

export const { setArticles } = articlesSlice.actions;

export default articlesSlice.reducer;