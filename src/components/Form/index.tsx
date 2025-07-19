import React from 'react';
import { Input } from '../UI/Input';
import styles from './form.module.scss';
import { authForm, regForm } from '../../constants/form';
import { useAppDispatch } from '../../app/hooks';
import { closeModal, fetchAuthorization, fetchProfile, resetError } from '../../features/thunk/Authorization';

type Mode = 'auth' | 'reg';

export const Form = () => {
  const [mode, setMode] = React.useState<Mode>('auth');
  const dispatch = useAppDispatch();

  const [formData, setFormData] = React.useState<Record<string, string>>({
    email: '',
    password: '',
    name: '',
    surname: '',
    acceptPassword: '',
  });

  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
  const [isRegistered, setIsRegistered] = React.useState(false);

  const inputs = mode === 'auth' ? authForm : regForm;

  const toggleMode = () => {
    setMode((prev) => (prev === 'auth' ? 'reg' : 'auth'));
    dispatch(resetError());
    setFormData({
      email: '',
      password: '',
      name: '',
      surname: '',
      acceptPassword: '',
    });
    setFormErrors({});
    setIsRegistered(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' })); // очищаем ошибку при вводе
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.email = 'Введите email';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Неверный формат email';
    }

    if (!formData.password.trim()) {
      errors.password = 'Введите пароль';
    } else if (formData.password.length < 6) {
      errors.password = 'Минимум 6 символов';
    }

    if (mode === 'reg') {
      if (!formData.name.trim()) {
        errors.name = 'Введите имя';
      }

      if (!formData.surname.trim()) {
        errors.surname = 'Введите фамилию';
      }

      if (!formData.acceptPassword.trim()) {
        errors.acceptPassword = 'Подтвердите пароль';
      } else if (formData.acceptPassword !== formData.password) {
        errors.acceptPassword = 'Пароли не совпадают';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'auth') {
      const data = { email: formData.email, password: formData.password };

      try {
        const result = await dispatch(fetchAuthorization({ data, url: 'auth/login' })).unwrap();
        if (result.result) {
          dispatch(fetchProfile({ url: 'profile' }));
          dispatch(closeModal());
        }
      } catch (err) {
        console.error('Ошибка авторизации:', err);
      }
    }

    if (mode === 'reg') {
      const data = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        surname: formData.surname,
      };

      try {
        const result = await dispatch(fetchAuthorization({ data, url: 'user' })).unwrap();
        if (result.success) {
          setIsRegistered(true);
        }
      } catch (err) {
        console.error('Ошибка регистрации:', err);
      }
    }
  };

  if (isRegistered) {
    return (
      <div className={styles.success}>
        <h3 className={styles.regTitle}>Регистрация завершена</h3>
        <p className={styles.regP}>Используйте вашу электронную почту для входа</p>
        <button
          className={styles.regButton}
          onClick={() => {
            setMode('auth');
            setIsRegistered(false);
            setFormData({
              email: '',
              password: '',
              name: '',
              surname: '',
              acceptPassword: '',
            });
            setFormErrors({});
          }}
        >
          Войти
        </button>
      </div>
    );
  }

  return (
    <>
      {mode == 'reg' && <h2 className={styles.titleReg}>Регистрация</h2>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <ul className={styles.list}>
          {inputs.map((item) => (
            <li key={item.placeholder}>
              <Input
                placeholder={item.placeholder}
                icon={item.icon}
                name={item.name}
                value={formData[item.name] || ''}
                onChange={handleChange}
                error={formErrors[item.name]}
              />
            </li>
          ))}
        </ul>
        <button type="submit" className={`${styles.button} ${styles.blueBtn}`}>
          {mode === 'auth' ? 'Войти' : 'Создать аккаунт'}
        </button>
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
            {mode === 'auth' ? 'Регистрация' : 'У меня есть пароль'}
          </span>
        </div>
      </form>
    </>
  );
};
