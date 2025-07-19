import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './filmsByGenre.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchFilmsByGenre } from '../../features/thunk/FilmsByGenre';
import { selectFilmsByGenre } from '../../features/thunk/selectors';
import { Card } from '../../components/Card';
import { LuxaryLoader } from '../../components/UI/LuxaryLoader';
import { resetFilmsByGenre } from '../../features/thunk/FilmsByGenre';

export const FilmsByGenrePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectFilmsByGenre);
  const { value } = useParams();

  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const filmsPerPage = 4;

  React.useEffect(() => {
    dispatch(resetFilmsByGenre());
    setPage(1);
    setHasMore(true);
  }, [value, dispatch]);

  React.useEffect(() => {
    if (value && hasMore) {
      dispatch(fetchFilmsByGenre({ value, page }));
    }
  }, [value, page, dispatch, hasMore]);

  React.useEffect(() => {
    if (data) {
      setHasMore(data.length >= page * filmsPerPage);
    }
  }, [data, page, filmsPerPage]);

  return (
    <section className={styles.filmsByGenre}>
      <div className="container">
        <div onClick={() => navigate(`/genres`, { replace: true })} className={`${styles.titleBlock}`}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.047 20.0012L26.2967 28.2507L23.9397 30.6077L13.333 20.0012L23.9397 9.39453L26.2967 11.7515L18.047 20.0012Z"
              fill="currentColor"
            />
          </svg>
          <h2 className="title48">{value}</h2>
        </div>
        <ul className={`list ${styles.mb}`}>
          {data?.map((film) => (
            <Card visible={false} onClick={() => navigate(`/about/${film.id}`)} key={`${film.id}-${value}`} {...film} />
          ))}
        </ul>

        {hasMore && (
          <div className={styles.button}>
            <button onClick={() => setPage((prev) => prev + 1)} disabled={status === 'loading'}>
              {status === 'loading' ? 'Загрузка...' : 'Показать еще'}
            </button>
          </div>
        )}

        {status === 'loading' && page > 1 && (
          <div className={styles.loaderWrapper}>
            <LuxaryLoader />
          </div>
        )}
      </div>
    </section>
  );
};
