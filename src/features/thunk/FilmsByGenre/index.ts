import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Film } from '../../../types/Film';

interface FilmSearchState {
  data: Film[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
interface FetchFilmParams {
  value: string;
  page: number;
}

export const fetchFilmsByGenre = createAsyncThunk<Film[], FetchFilmParams>(
  'filmsByGenre/fetchFilm',
  async ({ value, page }) => {
    const response = await fetch(`https://cinemaguide.skillbox.cc/movie/?genre=${value}&page=${page}&count=4`);
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

const filmsByGenre = createSlice({
  name: 'filmsByGenre',
  initialState,
  reducers: {
    resetFilmsByGenre: (state) => {
      state.data = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmsByGenre.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFilmsByGenre.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Для первой страницы заменяем данные, для последующих - добавляем
        if (action.meta.arg.page === 1) {
          state.data = action.payload;
        } else {
          // Фильтруем дубликаты перед добавлением
          const newFilms = action.payload.filter(
            (newFilm) => !state.data?.some((existingFilm) => existingFilm.id === newFilm.id),
          );
          state.data = [...(state.data || []), ...newFilms];
        }
      })
      .addCase(fetchFilmsByGenre.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

// Экспортируем экшен
export const { resetFilmsByGenre } = filmsByGenre.actions;
export default filmsByGenre.reducer;
