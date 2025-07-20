import styles from './form.module.scss';

interface SuccessProps {
  onClick: () => void;
}

export const SuccessForm = ({ onClick }: SuccessProps) => {
  return (
    <div className={styles.success}>
      <h3 className={styles.regTitle}>Регистрация завершена</h3>
      <p className={styles.regP}>Используйте вашу электронную почту для входа</p>
      <button className={styles.regButton} onClick={onClick}>
        Войти
      </button>
    </div>
  );
};
