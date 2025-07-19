import { CardOfGenre } from '../../components/CardOfGenre';
import styles from './genresPage.module.scss';
import React from 'react';
export const GenresPage = () => {
  const [genres, setGenres] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://cinemaguide.skillbox.cc/movie/genres`)
      .then((item) => item.json())
      .then((json) => setGenres(json));
  }, []);

  return (
    <section className={styles.genres}>
      <div className="container">
        <h2 className={`${styles.genreTitle} title48`}>Жанры фильмов</h2>
        <ul className="list">
          {genres.map((item) => (
            <CardOfGenre key={item} name={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};
