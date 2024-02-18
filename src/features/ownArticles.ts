import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { ArticleData } from "../types/ArticleData";

interface OwnArticlesSliceState {
  articles: ArticleData[];
}

const initialState: OwnArticlesSliceState = {
  articles: [],
};

export const ownArticlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticles: (state, action: PayloadAction<ArticleData>) => {
      state.articles = [...state.articles, action.payload];
    },
    removeArticle: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter(article => article.publishedAt !== action.payload);
    }
  }
});

export const { addArticles, removeArticle } = ownArticlesSlice.actions;

export default ownArticlesSlice.reducer;