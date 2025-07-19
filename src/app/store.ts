import { configureStore } from '@reduxjs/toolkit';
import topFilmsReducer from '../features/thunk/Top10Films';
import randomFilmReducer from '../features/thunk/RandomFilm';
import filmByIdReducer from '../features/thunk/FilmByID';
import filmsSearchReducer from '../features/thunk/FilmSearch';
import trailerModalReducer from '../features/slice/TrailerAndSearchModalSlice';
import authorizationReducer from '../features/thunk/Authorization';
import favoritesReducer from '../features/thunk/Favorites';
import filmsGenreReducer from '../features/thunk/FilmsByGenre';

export const store = configureStore({
  reducer: {
    topFilms: topFilmsReducer,
    randomFilm: randomFilmReducer,
    filmByID: filmByIdReducer,
    trailerModal: trailerModalReducer,
    filmsSearch: filmsSearchReducer,
    authorization: authorizationReducer,
    favorites: favoritesReducer,
    filmsByGenre: filmsGenreReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
