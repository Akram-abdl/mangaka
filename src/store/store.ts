import { configureStore } from '@reduxjs/toolkit';
import chapterSlice from './chapterSlice';

const store = configureStore({
    reducer: {
        chapters: chapterSlice,
    },
});

export default store;