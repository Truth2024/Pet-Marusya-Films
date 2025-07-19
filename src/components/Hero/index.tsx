import styles from './hero.module.scss';
import { MovieHeaderInfo } from '../MovieHeaderInfo';
import { useAppSelector } from '../../app/hooks';
import HeroLoader from './HeroLoader';
import { selectRandomFilm } from '../../features/thunk/selectors';
import { FilmCardWithControls } from '../FilmCardWithControls';
import { Image } from '../FilmCardWithControls/Image';

export const Hero = () => {
  const { data, status } = useAppSelector(selectRandomFilm);

  if (!data) return null;

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroFlex}>
          <div className={styles.heroLeft}>
            {status === 'loading' && <HeroLoader />}
            {status === 'succeeded' && (
              <>
                <MovieHeaderInfo data={data} className={styles.heroInfo} />
                <FilmCardWithControls visible={true} data={data} />
              </>
            )}
          </div>
          <Image data={data} />
        </div>
      </div>
    </section>
  );
};
