import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ChapterList } from '../models/ChapterDetails';

export enum ChapterStatus {
    None,
    Loading,
    Finished,
    Error
}

interface ChaptersState {
    chapters: ChapterList,
    status: ChapterStatus,
}

const initialChapters: ChaptersState = {
    chapters: [],
    status: ChapterStatus.None,
}

export const chapterSlice = createSlice({
    name: 'chapterSlice',
    initialState: initialChapters,
    reducers: {
        setChapters: (state, action) => {
            state.chapters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchChapters.pending, (state, action) => {
        state.status = ChapterStatus.Loading;
        })
        .addCase(fetchChapters.fulfilled, (state, action) => {
        state.chapters = action.payload;
        state.status = ChapterStatus.Finished
        })
        .addCase(fetchChapters.rejected, (state, action) => {
        state.status = ChapterStatus.Error
        });
        },
});

export const fetchChapters = createAsyncThunk(
    'chapters/fetchChapters',
    async (mangaId: string): Promise<ChapterList> => {
        try {
            const response = await fetch(`https://api.mangadex.org/chapter?manga=${mangaId}&order%5Bchapter%5D=asc&limit=10&translatedLanguage%5B%5D=en`);
            return await response.json();
        } catch (error) {
            throw new Error("can't fetch all chapters");
        }
    }
);

export const {setChapters} = chapterSlice.actions;
export default chapterSlice.reducer;