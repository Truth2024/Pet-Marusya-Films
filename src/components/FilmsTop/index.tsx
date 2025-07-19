import { Card } from '../Card';
import { useAppSelector } from '../../app/hooks';
import { selectTopFilms } from '../../features/thunk/selectors';
import styles from './films.module.scss';
import CardSkeleton from '../Card/CardSkeleton';
import { useNavigate } from 'react-router-dom';

export const FilmsTop = () => {
  const navigate = useNavigate();
  const { data, status } = useAppSelector(selectTopFilms);
  return (
    <section className={` ${styles.filmsSection}`}>
      <div className="container">
        <h3>Топ 10 фильмов</h3>
        <ul className={`${styles.customList}`}>
          {status === 'loading' && [...Array(10)].map((_, index) => <CardSkeleton key={index} />)}

          {status == 'succeeded' &&
            data.map((item, index) => (
              <Card
                visible={true}
                onClick={() => navigate(`/about/${item.id}`)}
                key={item.id}
                index={index}
                {...item}
              />
            ))}
        </ul>
      </div>
    </section>
  );
};
