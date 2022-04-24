import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllMangas } from "../API_Calls/getAllMangas";
import { Manga } from "../models/Manga";

interface MangaState {
  search: string;
  mangasList: Manga[];
  error?: string;
  loading: boolean;
}

const initialState: MangaState = {
  search: "",
  mangasList: [],
  loading: false,
};

export const fetchMangas = createAsyncThunk<
  Manga[],
  string,
  { rejectValue: string }
>("manga/fetchMangas", async (_, thunkAPI) => {
  try {
    return await getAllMangas();
  } catch (e) {
    const error = e as Error;
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const mangaSlice = createSlice({
  name: "mangas",
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMangas.fulfilled, (state, { payload }) => {
      state.mangasList = payload;
      state.loading = false;
    });
    builder.addCase(fetchMangas.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(fetchMangas.pending, (state, { payload }) => {
      state.loading = true;
      state.error = undefined;
    });
  },
});

export const { setSearch } = mangaSlice.actions;
export default mangaSlice.reducer;
