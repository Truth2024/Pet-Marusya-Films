import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Film } from '../../../types/Film';

interface FilmSearchState {
  data: Film[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
interface FetchFilmParams {
  value: string;
}

export const fetchFilmsSearch = createAsyncThunk<Film[], FetchFilmParams>(
  'filmFilmsSearch/fetchFilm',
  async ({ value }) => {
    const response = await fetch(`https://cinemaguide.skillbox.cc/movie/${value}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
);

const initialState: FilmSearchState = {
  data: [],
  status: 'idle',
  error: null,
};

const filmsSearch = createSlice({
  name: 'filmSearchByFilter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmsSearch.pending, (state) => {
        state.data = [];
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchFilmsSearch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchFilmsSearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default filmsSearch.reducer;
