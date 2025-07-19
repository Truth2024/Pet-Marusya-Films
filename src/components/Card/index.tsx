import styles from './card.module.scss';
import type { Film } from '../../types/Film';
import { ImageWithFallback } from '../UI/ImageWithFallback';

interface CardProps extends Film {
  index?: number;
  onClick: () => void;
  visible?: boolean;
  deleteBtn?: boolean;
  onDelete?: () => void;
}

export const Card = ({ index, onClick, deleteBtn, visible, onDelete, ...item }: CardProps) => {
  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div onClick={onClick} className={styles.card}>
      <ImageWithFallback src={item.posterUrl} alt={item.originalTitle} />
      {visible && index !== undefined && <span className={styles.number}>{index + 1}</span>}
      {deleteBtn && (
        <button onClick={handleDeleteClick} className={styles.deleteBtn} aria-label="Удалить из избранного">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.9987 10.5865L16.9485 5.63672L18.3627 7.05093L13.4129 12.0007L18.3627 16.9504L16.9485 18.3646L11.9987 13.4149L7.04899 18.3646L5.63477 16.9504L10.5845 12.0007L5.63477 7.05093L7.04899 5.63672L11.9987 10.5865Z"
              fill="black"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
