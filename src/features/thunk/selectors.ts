import type { RootState } from '../../app/store';
//TOP10
export const selectTopFilms = (state: RootState) => state.topFilms;
export const selectTopFilmsData = (state: RootState) => state.topFilms.data;
export const selectTopFilmsStatus = (state: RootState) => state.topFilms.status;
export const selectTopFilmsError = (state: RootState) => state.topFilms.error;
//RANDOM
export const selectRandomFilm = (state: RootState) => state.randomFilm;

//FILM_BY_ID
export const selectFilmById = (state: RootState) => state.filmByID;

//FILMS_SEARCH
export const selectFilmsSearch = (state: RootState) => state.filmsSearch;

//AUTH
export const selectAutharization = (state: RootState) => state.authorization;

//FAVORITES
export const selectFavorites = (state: RootState) => state.favorites;

//FILMS__BY__GENRE
export const selectFilmsByGenre = (state: RootState) => state.filmsByGenre;
export const selectProfileName = (state: RootState) => state.authorization.profile?.name || 'Войти';
