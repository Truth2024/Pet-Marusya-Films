import React from 'react';
import styles from './cardWithControls.module.scss';
import noImg from '../../assets/noimg.png';
import type { Film } from '../../types/Film';

interface ImageProps {
  data: Film | null;
}

export const Image = ({ data }: ImageProps) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [data?.posterUrl]);

  return (
    <div className={styles.heroRight}>
      {data?.posterUrl ? (
        <>
          {!imgLoaded && !imgError && <div className={styles.skeletonImg} />}
          {!imgError && (
            <img
              src={data.posterUrl}
              alt={data.title}
              className={styles.image}
              style={{ display: imgLoaded ? 'block' : 'none' }}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          )}
          {imgError && (
            <div className={styles.fallback}>
              <img className={styles.noImg} src={noImg} alt="" />
              Картинка не загрузилась
            </div>
          )}
        </>
      ) : (
        <div className={styles.fallback}>
          <img className={styles.noImg} src={noImg} alt="" />
          {data?.title}
        </div>
      )}
    </div>
  );
};
