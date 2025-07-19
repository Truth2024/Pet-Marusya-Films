import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Film } from '../../../types/Film';

interface FilmSearchState {
  data: Film | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
interface FetchFilmParams {
  id: string;
}

export const fetchFilmByID = createAsyncThunk<Film, FetchFilmParams>('filmFilmByID/fetchFilm', async ({ id }) => {
  const response = await fetch(`https://cinemaguide.skillbox.cc/movie/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json(); // Возвращаем как есть (массив или объект)
});

const initialState: FilmSearchState = {
  data: null,
  status: 'idle',
  error: null,
};

const filmByID = createSlice({
  name: 'filmSearchByFilter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmByID.pending, (state) => {
        state.data = {} as Film;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchFilmByID.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchFilmByID.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default filmByID.reducer;
