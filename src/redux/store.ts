import { configureStore } from "@reduxjs/toolkit";
import chapterSlice from "./chapterSlice";

export const store = configureStore({
  reducer: {
    chapter: chapterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
