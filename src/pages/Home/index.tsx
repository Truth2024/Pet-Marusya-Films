import React from 'react';
import { useAppDispatch } from '../../app/hooks';

import { Hero } from '../../components/Hero';
import { FilmsTop } from '../../components/FilmsTop';

import { fetchTopFilms } from '../../features/thunk/Top10Films';
import { fetchRandomFilm } from '../../features/thunk/RandomFilm';

export const Home = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchRandomFilm());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchTopFilms());
  }, [dispatch]);

  return (
    <>
      <Hero />
      <FilmsTop />
    </>
  );
};
