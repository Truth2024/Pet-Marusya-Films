import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './form.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeModal, fetchAuthorization, fetchProfile, resetError } from '../../features/thunk/Authorization';
import { selectAutharization } from '../../features/thunk/selectors';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Mode, AuthFormFields, RegFormFields } from '../../types/Auth';
import { authSchema, regSchema } from '../../types/Auth';
import { SuccessForm } from './SuccessForm';
import { AuthForm } from './AuthForm';
import { RegForm } from './RegForm';

export const Form = () => {
  const [mode, setMode] = React.useState<Mode>('auth');
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(selectAutharization);
  const [isRegistered, setIsRegistered] = React.useState(false);

  const {
    register: registerAuth,
    handleSubmit: handleSubmitAuth,
    formState: { errors: errorsAuth, isSubmitting: isSubmittingAuth },
  } = useForm<AuthFormFields>({
    resolver: zodResolver(authSchema),
  });

  const {
    register: registerReg,
    handleSubmit: handleSubmitReg,
    formState: { errors: errorsReg, isSubmitting: isSubmittingReg },
  } = useForm<RegFormFields>({
    resolver: zodResolver(regSchema),
  });

  const toggleMode = React.useCallback(() => {
    setMode((prev) => (prev === 'auth' ? 'reg' : 'auth'));
    dispatch(resetError());
    setIsRegistered(false);
  }, [dispatch]);

  const onSubmitAuth: SubmitHandler<AuthFormFields> = async (formData) => {
    try {
      const result = await dispatch(fetchAuthorization({ data: formData, url: 'auth/login' })).unwrap();
      if (result.result) {
        dispatch(fetchProfile({ url: 'profile' }));
        dispatch(closeModal());
      }
    } catch (err) {
      console.error('Ошибка авторизации:', err);
    }
  };

  const onSubmitReg: SubmitHandler<RegFormFields> = async (formData) => {
    try {
      const { email, password, name, surname } = formData;
      const data = { email, password, name, surname };
      const result = await dispatch(fetchAuthorization({ data, url: 'user' })).unwrap();
      if (result.success) {
        setIsRegistered(true);
      }
    } catch (err) {
      console.error('Ошибка регистрации:', err);
    }
  };

  const onClickSuccess = () => {
    setMode('auth');
    setIsRegistered(false);
  };

  if (isRegistered) {
    return <SuccessForm onClick={onClickSuccess} />;
  }

  return (
    <>
      {mode === 'reg' && <h2 className={styles.titleReg}>Регистрация</h2>}

      {mode === 'auth' && (
        <AuthForm
          onSubmit={handleSubmitAuth(onSubmitAuth)}
          isSubmittingAuth={isSubmittingAuth}
          registerAuth={registerAuth}
          errorsAuth={errorsAuth}
          error={error}
          toggleMode={toggleMode}
        />
      )}

      {mode === 'reg' && (
        <RegForm
          registerReg={registerReg}
          handleSubmitReg={handleSubmitReg}
          errorsReg={errorsReg}
          isSubmittingReg={isSubmittingReg}
          error={error}
          toggleMode={toggleMode}
          onSubmitReg={onSubmitReg}
        />
      )}
    </>
  );
};
