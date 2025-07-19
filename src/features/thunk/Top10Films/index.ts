import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Film } from '../../../types/Film';

interface TopFilmsState {
  data: Film[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchTopFilms = createAsyncThunk<Film[]>('topFilms/fetchTop', async () => {
  const response = await fetch(`https://cinemaguide.skillbox.cc/movie/top10`);

  return await response.json();
});

const initialState: TopFilmsState = {
  data: [],
  status: 'idle',
  error: null,
};

const topFilms = createSlice({
  name: 'topFilms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopFilms.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchTopFilms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTopFilms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default topFilms.reducer;
