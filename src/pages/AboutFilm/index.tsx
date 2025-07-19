import React from 'react';
import styles from './about.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFilmById } from '../../features/thunk/selectors';
import { FilmCardWithControls } from '../../components/FilmCardWithControls';
import { MovieHeaderInfo } from '../../components/MovieHeaderInfo';
import HeroLoader from '../../components/Hero/HeroLoader';
import { Image } from '../../components/FilmCardWithControls/Image';
import { useParams } from 'react-router-dom';
import { fetchFilmByID } from '../../features/thunk/FilmByID';
import { formatNumberWithSpaces } from '../../utisl/budget';

export const AboutFilm = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (id) {
      dispatch(fetchFilmByID({ id }));
    }
  }, [dispatch, id]);

  const { data, status } = useAppSelector(selectFilmById);

  if (!data) return null;

  return (
    <>
      <section className={styles.about}>
        <div className="container">
          <div className={styles.aboutFlex}>
            <div className={styles.aboutLeft}>
              {status === 'loading' && <HeroLoader />}
              {status === 'succeeded' && (
                <>
                  <MovieHeaderInfo data={data} className={styles.aboutInfo} />
                  <FilmCardWithControls visible={false} data={data} />
                </>
              )}
            </div>
            <Image data={data} />
          </div>
        </div>
      </section>
      <section className={styles.aboutBottom}>
        <div className="container">
          <h2 className={styles.title}>О фильме</h2>
          <div>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.label}>Язык оригинала</span>
                <div className={styles.dash}></div>
                <span className={styles.labelItems}>{data.language ? data.language : 'нет данных'}</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.label}>Бюджет</span>
                <div className={styles.dash}></div>
                <span className={styles.labelItems}>
                  {data.budget ? formatNumberWithSpaces(data.budget) : 'нет данных'}{' '}
                </span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.label}>Выручка</span>
                <div className={styles.dash}></div>
                <span className={styles.labelItems}>
                  {data.revenue ? formatNumberWithSpaces(data.revenue) : 'нет данных'}
                </span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.label}>Режисер</span>
                <div className={styles.dash}></div>
                <span className={styles.labelItems}>{data.director ? data.director : 'нет данных'}</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.label}>Продакшен</span>
                <div className={styles.dash}></div>
                <span className={styles.labelItems}>{data.production ? data.production : 'нет данных'}</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.label}>Награды</span>
                <div className={styles.dash}></div>
                <span className={styles.labelItems}>{data.awardsSummary ? data.awardsSummary : 'нет наград'}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
