import { useNavigate } from 'react-router-dom';
import styles from './cardOfGenre.module.scss';
import { genreImages } from '../../constants/genres';

type Genres =
  | 'drama'
  | 'comedy'
  | 'detective'
  | 'family'
  | 'history'
  | 'thriller'
  | 'fantasy'
  | 'adventure'
  | 'horror'
  | 'scifi'
  | 'stand-up'
  | 'tv-movie';

interface CardOfGenreProps {
  name: Genres;
}

export const CardOfGenre = ({ name }: CardOfGenreProps) => {
  const getImageSrc = () => {
    switch (name) {
      case 'stand-up':
        return genreImages.stand;
      case 'tv-movie':
        return genreImages.tv;

      default:
        return genreImages[name];
    }
  };

  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`${name}`)} className={styles.card}>
      <img className={styles.img} src={getImageSrc()} alt={name} />
      <div className={styles.bg}>
        <span>{name}</span>
      </div>
    </div>
  );
};
