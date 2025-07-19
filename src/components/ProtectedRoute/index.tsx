import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectAutharization } from '../../features/thunk/selectors';

export const ProtectedRoute = () => {
  const { profile } = useAppSelector(selectAutharization);

  return profile ? <Outlet /> : <Navigate to="/error" replace />;
};
