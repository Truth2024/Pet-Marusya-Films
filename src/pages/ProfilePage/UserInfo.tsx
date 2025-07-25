import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './profile.module.scss';
import { fetchLogoutProfile } from '../../features/thunk/Authorization';
import { selectAutharization } from '../../features/thunk/selectors';

export const UserInfo = () => {
  const { profile } = useAppSelector(selectAutharization);
  const initials = `${profile?.name.charAt(0)}${profile?.surname?.charAt(0)}`;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await dispatch(fetchLogoutProfile()).unwrap();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };
  return (
    <>
      <div className={styles.accountIfno}>
        <div className={styles.item}>
          <div className={styles.round}>{initials}</div>
          <div className={styles.name}>
            <span className={styles.label}>Имя фамилия</span>
            <span className={styles.info}>
              {profile && profile.name && profile.name} {profile?.surname}
            </span>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.round}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
                fill="white"
              />
            </svg>
          </div>
          <div className={styles.name}>
            <span className={styles.label}>Электронная почта</span>
            <span className={styles.info}>{profile?.email}</span>
          </div>
        </div>
      </div>
      <button className={styles.logout} onClick={logout}>
        Выйти из профиля
      </button>
    </>
  );
};
