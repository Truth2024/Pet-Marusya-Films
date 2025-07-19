import { useAppDispatch } from '../../app/hooks';
import styles from './cardWithControls.module.scss';
import { setOpenTrailer } from '../../features/slice/TrailerAndSearchModalSlice';
import type { Film } from '../../types/Film';
import { useNavigate } from 'react-router-dom';
import { fetchRandomFilm } from '../../features/thunk/RandomFilm';
import { FavoriteBtn } from '../FavoriteBtn';

interface FilmCardWithControlsProps {
  visible: boolean;
  data: Film;
}

export const FilmCardWithControls = ({ visible, data }: FilmCardWithControlsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleTrailerClick = () => {
    if (data?.trailerUrl) {
      dispatch(setOpenTrailer(data.trailerUrl));
    }
  };
  const handleAboutClick = () => {
    if (data?.id) {
      navigate(`/about/${data.id}`);
    }
  };

  return (
    <>
      <h2 className={`${styles.heroTitle} title48`}>{data?.title}</h2>
      <p className={styles.heroSubtitle}>{data?.plot}</p>
      <div className={styles.heroButtons}>
        <button onClick={handleTrailerClick} className={`${styles.btn} ${styles.btnTrailer} ${styles.btnHover}`}>
          Трейлер
        </button>

        {visible && (
          <button onClick={handleAboutClick} className={`${styles.btn} ${styles.btnAbout} ${styles.btnHover}`}>
            О фильме
          </button>
        )}

        <FavoriteBtn id={data?.id} />
        {visible && (
          <button onClick={() => dispatch(fetchRandomFilm())} className={`${styles.btnExtra}  ${styles.btnHover}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C12.7486 2 15.1749 3.38626 16.6156 5.5H14V7.5H20V1.5H18V3.99936C16.1762 1.57166 13.2724 0 10 0C4.47715 0 0 4.47715 0 10H2C2 5.58172 5.58172 2 10 2ZM18 10C18 14.4183 14.4183 18 10 18C7.25144 18 4.82508 16.6137 3.38443 14.5H6V12.5H0V18.5H2V16.0006C3.82381 18.4283 6.72764 20 10 20C15.5228 20 20 15.5228 20 10H18Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};
