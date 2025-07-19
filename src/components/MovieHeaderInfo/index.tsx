import type { Film } from '../../types/Film';
import { formatDuration } from '../../utisl/runtime';
import { color, rating } from '../../utisl/rating';
import styles from './Info.module.scss';

interface MovieHeaderInfo {
  className?: string;
  data: Film | null;
  mobileWrapper?: string;
  mobileInfoRating?: string;
  mobileInfoList?: string;
  mobileInfoItem?: string;
  mobileRunTime?: string;
}

export const MovieHeaderInfo = ({
  className = '',
  mobileWrapper = '',
  mobileInfoRating = '',
  mobileInfoList = '',
  mobileInfoItem = '',
  mobileRunTime = '',
  data,
}: MovieHeaderInfo) => {
  const runtime = typeof data?.runtime === 'number' ? formatDuration(data.runtime) : 'no info';
  return (
    <div className={`${styles.infoWrapper} ${className} ${mobileWrapper}`}>
      <span
        style={{
          background: color(data?.tmdbRating ?? 0),
        }}
        className={`${styles.infoRating}  ${mobileInfoRating}`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z"
            fill="white"
          />
        </svg>
        {typeof data?.tmdbRating === 'number'
          ? data.tmdbRating == 0
            ? 'no rating'
            : rating(data.tmdbRating)
          : 'no rating'}
      </span>
      <ul className={`${styles.infoList}   ${mobileInfoList}`}>
        <li className={`${styles.infoItem} ${mobileInfoItem}`}>{data?.releaseYear?.toString()}</li>
        <li className={`${styles.infoItem} ${mobileInfoItem}`}>{data?.genres ? data?.genres[0] : 'no genre'}</li>
        <li className={`${styles.infoItem} ${mobileInfoItem} ${mobileRunTime}`}>{runtime}</li>
      </ul>
    </div>
  );
};
