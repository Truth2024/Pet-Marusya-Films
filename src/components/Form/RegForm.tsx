import React from 'react';
import { regForm } from '../../constants/form';
import { Input } from '../UI/Input';
import styles from './form.module.scss';
import type { UseFormRegister, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import type { RegFormFields } from '../../types/Auth';

type RegFormProps = {
  registerReg: UseFormRegister<RegFormFields>;
  handleSubmitReg: UseFormHandleSubmit<RegFormFields>;
  errorsReg: Partial<Record<keyof RegFormFields, { message?: string }>>;
  isSubmittingReg: boolean;
  error: string | null;
  toggleMode: () => void;
  onSubmitReg: SubmitHandler<RegFormFields>;
};

export const RegForm: React.FC<RegFormProps> = ({
  registerReg,
  handleSubmitReg,
  errorsReg,
  isSubmittingReg,
  error,
  toggleMode,
  onSubmitReg,
}) => {
  return (
    <form onSubmit={handleSubmitReg(onSubmitReg)} className={styles.form}>
      <ul className={styles.list}>
        {regForm.map((item) => (
          <li key={item.placeholder}>
            <Input
              {...registerReg(item.name as keyof RegFormFields)}
              placeholder={item.placeholder}
              icon={item.icon}
              name={item.name}
              type={item.type}
            />
            {errorsReg[item.name as keyof RegFormFields] && (
              <div className={styles.error}>{errorsReg[item.name as keyof RegFormFields]?.message}</div>
            )}
          </li>
        ))}
      </ul>

      <button type="submit" disabled={isSubmittingReg} className={`${styles.button} ${styles.blueBtn}`}>
        {isSubmittingReg ? 'Загрузка...' : 'Создать аккаунт'}
      </button>
      {error && <p className={styles.errorRoot}>{error}</p>}
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
          У меня есть пароль
        </span>
      </div>
    </form>
  );
};
