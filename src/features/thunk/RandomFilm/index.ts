import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Film } from '../../../types/Film';

interface RandomFilmsState {
  data: Film | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchRandomFilm = createAsyncThunk<Film>('randomFilm/fetchRandom', async () => {
  const response = await fetch(`https://cinemaguide.skillbox.cc/movie/random`);

  return await response.json();
});

const initialState: RandomFilmsState = {
  data: null,
  status: 'idle',
  error: null,
};

const randomFilm = createSlice({
  name: 'randomFilm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomFilm.pending, (state) => {
        state.data = {} as Film;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchRandomFilm.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRandomFilm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default randomFilm.reducer;
