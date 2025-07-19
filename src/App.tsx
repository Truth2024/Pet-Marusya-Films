import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom';
import { Home, AboutFilm } from './pages/imports';
import { Layout } from './components/Layout';
import { GenresPage } from './pages/GenresPage';
import { FilmsByGenrePage } from './pages/FilmsByGenrePage';
import { ProfilePage } from './pages/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorProfilePage } from './pages/ErrorProfilePage';
import React from 'react';
import { useAppDispatch } from './app/hooks';
import { fetchProfile } from './features/thunk/Authorization';
import { fetchFavorites } from './features/thunk/Favorites';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Layout />
        <ScrollRestoration />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'about/:id', element: <AboutFilm /> },
      { path: 'genres', element: <GenresPage /> },
      { path: 'genres/:value', element: <FilmsByGenrePage /> },
      {
        path: 'profile',
        element: <ProtectedRoute />,
        children: [{ index: true, element: <ProfilePage /> }],
      },
      { path: 'error', element: <ErrorProfilePage /> },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProfile({ url: 'profile' }));
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchFavorites({ url: 'favorites' }));
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
