import { useNavigate } from 'react-router-dom';
import type { Film } from '../../types/Film';
import { MovieHeaderInfo } from '../MovieHeaderInfo';
import styles from './card.module.scss';

interface Props {
  data: Film; // Принимаем только один фильм, не массив
  onClick?: (isOpen: boolean) => void;
}

export const SearchCard = ({ data, onClick }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/about/${data.id}`);
    onClick?.(false);
  };

  return (
    <div onClick={handleClick} className={styles.card}>
      <img className={styles.image} src={data.posterUrl || ''} alt={data.title} />
      <div className={styles.left}>
        <MovieHeaderInfo
          data={data}
          className={styles.filmInfo}
          mobileWrapper={styles.mobileWrapper}
          mobileInfoRating={styles.mobileInfoRating}
          mobileInfoItem={styles.mobileInfoItem}
          mobileInfoList={styles.mobileInfoList}
          mobileRunTime={styles.mobileRunTime}
        />
        <h4 className={styles.cardTitle}>{data.title}</h4>
      </div>
    </div>
  );
};
