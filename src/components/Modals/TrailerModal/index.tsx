import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectTrailerModal, setCloseTrailer } from '../../../features/slice/selectors';
import styles from './trailerModal.module.scss';
import { getYoutubeEmbedUrl } from '../../../utisl/youtube';
import { LuxaryLoader } from '../../UI/LuxaryLoader';

export const TrailerModal = () => {
  const dispatch = useAppDispatch();
  const { isOpenTrailer, url } = useAppSelector(selectTrailerModal);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const embUrl = url ? getYoutubeEmbedUrl(url) : '';
  return (
    <div
      className={`${styles.overlay} ${!isOpenTrailer ? styles.hidden : ''}`}
      onClick={() => dispatch(setCloseTrailer())}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.window}>
        <div onClick={() => dispatch(setCloseTrailer())} className={styles.close}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.5859 10L0.792969 2.20706L2.20718 0.792847L10.0001 8.5857L17.793 0.792847L19.2072 2.20706L11.4143 10L19.2072 17.7928L17.793 19.2071L10.0001 11.4142L2.20718 19.2071L0.792969 17.7928L8.5859 10Z"
              fill="black"
            />
          </svg>
        </div>

        <div className={styles.displayOverlay}>
          {!isLoaded && <LuxaryLoader />}
          {embUrl ? (
            <iframe
              onLoad={() => setIsLoaded(true)}
              className={styles.video}
              src={embUrl}
              title="Movie Trailer"
              allowFullScreen
            />
          ) : (
            <p className={styles.error}>Трейлер недоступен</p>
          )}
        </div>
      </div>
    </div>
  );
};
