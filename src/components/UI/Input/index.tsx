import React, { forwardRef } from 'react';
import styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, className = '', icon, ...rest }, ref) => {
  return (
    <>
      <div className={`${styles.inputGroup} ${error ? styles.border : ''}`}>
        <div className={styles.inputDiv}>
          <input ref={ref} className={`${styles.input} ${className}`} {...rest} />
          {icon && <span className={`${styles.iconWrapper} ${error ? styles.border : ''}`}>{icon}</span>}
        </div>
      </div>
      <p className={`${styles.error} ${error ? styles.visible : ''}`}>{error}</p>
    </>
  );
});

Input.displayName = 'Input';
