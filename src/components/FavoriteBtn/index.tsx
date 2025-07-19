import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openModal } from '../../features/thunk/Authorization';
import { fetchFavoriteAdd, fetchFavoriteDelete, fetchFavorites } from '../../features/thunk/Favorites';
import styles from './favoriteBtn.module.scss';
import React from 'react';

interface FavoriteBtnProps {
  id: number;
}

export const FavoriteBtn = React.memo(({ id }: FavoriteBtnProps) => {
  const dispatch = useAppDispatch();
  const { films, status } = useAppSelector((state) => state.favorites);
  const { profile } = useAppSelector((state) => state.authorization);

  // Проверяем наличие фильма в избранных
  const isFavorite = films.some((film) => film.id === id);
  const toggleButton = async () => {
    // Если пользователь не авторизован - открываем модальное окно входа
    if (!profile) {
      dispatch(openModal());
      return;
    }

    try {
      if (!isFavorite) {
        await dispatch(fetchFavoriteAdd({ id })).unwrap();
        dispatch(fetchFavorites({ url: 'favorites' }));
      } else {
        await dispatch(fetchFavoriteDelete({ id })).unwrap();
        dispatch(fetchFavorites({ url: 'favorites' }));
      }
    } catch (error) {
      console.error('Ошибка при обновлении избранного:', error);
    }
  };

  return (
    <button
      onClick={toggleButton}
      disabled={status === 'loading'}
      className={`${styles.btnExtra} ${styles.btnHover} ${isFavorite ? styles.added : ''}`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z" />
      </svg>
    </button>
  );
});
