import React from 'react';
import styles from './fallback.module.scss';
import img from '../../../assets/noimg.png';
export const ImageWithFallback = ({ src, alt }: { src: string; alt: string }) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  if (hasError || src == null) {
    return (
      <div className={styles.noLoad}>
        <img width={80} height={80} src={img} alt="" />
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <div className={styles.image}>
      {isLoading && <div className={styles.skeleton} />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          display: isLoading ? 'none' : 'block',
        }}
      />
    </div>
  );
};
