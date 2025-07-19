import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectAutharization } from '../../features/thunk/selectors';
import React from 'react';

export const ErrorProfilePage = () => {
  const { profile, status } = useAppSelector(selectAutharization);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (status === 'succeeded' && profile) {
      navigate('/');
    }
  }, [profile, status, navigate]);

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>Ошибка 403</h1>
      <p>Доступ запрещён. Пожалуйста, войдите в аккаунт.</p>
    </div>
  );
};
