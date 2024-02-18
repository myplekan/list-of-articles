import { configureStore } from '@reduxjs/toolkit';
import articlesSlice from '../features/articles';
import ownArticlesSlice from '../features/ownArticles';
import pinActicleSlice from '../features/pinActicle';

export const store = configureStore({
  reducer: {
    articles: articlesSlice,
    ownArticles: ownArticlesSlice,
    pinArticle: pinActicleSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
