import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Film } from '../../../types/Film';

interface FavoritesProps {
  url: string;
}

export const fetchFavorites = createAsyncThunk<Film[], FavoritesProps>('favorites/fetchFavorites', async ({ url }) => {
  const response = await fetch(`https://cinemaguide.skillbox.cc/${url}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch favorites');
  }

  return await response.json(); // возвращаем Film[]
});

interface FavoriteAddDeleteProps {
  id: number;
}

export const fetchFavoriteAdd = createAsyncThunk<boolean, FavoriteAddDeleteProps>(
  'favorites/fetchFavoriteAdd',
  async ({ id }) => {
    const response = await fetch(`https://cinemaguide.skillbox.cc/favorites`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: `${id}` }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Add failed');
    }

    return await response.json();
  },
);

export const fetchFavoriteDelete = createAsyncThunk<boolean, FavoriteAddDeleteProps>(
  'favorites/fetchFavoriteDelete',
  async ({ id }) => {
    const response = await fetch(`https://cinemaguide.skillbox.cc/favorites/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete favorite');
    }

    return await response.json();
  },
);

interface FavoritesState {
  films: Film[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isFavorite: boolean;

  // isFavorite: boolean;
}

const initialState: FavoritesState = {
  films: [],
  status: 'idle',
  error: null,
  isFavorite: false,
};

const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Добавляем редьюсер для локального обновления
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.films = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(fetchFavoriteAdd.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavoriteAdd.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchFavoriteDelete.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavoriteDelete.fulfilled, (state) => {
        state.status = 'succeeded';
      });
  },
});
export const {} = favorites.actions;
export default favorites.reducer;
