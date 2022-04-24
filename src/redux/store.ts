import { configureStore } from "@reduxjs/toolkit";
import chapterSlice from "./chapterSlice";
import mangaSlice from "./mangaSlice";

export const store = configureStore({
  reducer: {
    chapter: chapterSlice,
    mangas: mangaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
