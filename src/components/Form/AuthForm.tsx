import React from 'react';
import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type AuthFormFields } from '../../types/Auth';
import { Input } from '../UI/Input';
import styles from './form.module.scss';
import { authForm } from '../../constants/form';

interface AuthFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isSubmittingAuth: boolean;
  registerAuth: UseFormRegister<AuthFormFields>;
  errorsAuth: FieldErrors<AuthFormFields>;
  error: string | null;
  toggleMode: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  isSubmittingAuth,
  registerAuth,
  errorsAuth,
  error,
  toggleMode,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <ul className={styles.list}>
        {authForm.map((item) => (
          <li key={item.placeholder}>
            <Input
              {...registerAuth(item.name as keyof AuthFormFields)}
              placeholder={item.placeholder}
              icon={item.icon}
              name={item.name}
              type={item.type}
            />
            {errorsAuth[item.name as keyof AuthFormFields] && (
              <div className={styles.error}>{errorsAuth[item.name as keyof AuthFormFields]?.message}</div>
            )}
          </li>
        ))}
      </ul>

      <button type="submit" disabled={isSubmittingAuth} className={`${styles.button} ${styles.blueBtn}`}>
        {isSubmittingAuth ? 'Загрузка...' : 'Войти'}
      </button>
      {error && <p className={styles.errorRoot}>Неверный логин или пароль</p>}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span
          onClick={toggleMode}
          className={`${styles.transparentBtn} ${styles.button}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleMode();
          }}
        >
          Регистрация
        </span>
      </div>
    </form>
  );
};
