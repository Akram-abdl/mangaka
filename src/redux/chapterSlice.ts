import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllChapters } from "../API_Calls/getAllChapters";
import { ChapterList } from "../models/ChapterDetails";

interface ChapterState {
  chapterList: ChapterList;
  error?: string;
}

const initialState: ChapterState = {
  chapterList: [],
};

export const fetchChapters = createAsyncThunk<
  ChapterList,
  string,
  { rejectValue: string }
>("chapter/fetchChapters", async (mangaId, thunkAPI) => {
  try {
    return await getAllChapters(mangaId);
  } catch (e) {
    const error = e as Error;
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
    setChapter: (state, { payload }) => {
      state.chapterList = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChapters.fulfilled, (state, { payload }) => {
      state.chapterList = payload;
    });
    builder.addCase(fetchChapters.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export const { setChapter } = chapterSlice.actions;
export default chapterSlice.reducer;
