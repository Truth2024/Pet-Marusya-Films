import styles from './loader.module.scss';

export const LuxaryLoader = () => {
  return (
    <>
      <svg
        width="40"
        height="40"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.loader}
      >
        <path
          d="M25.6067 4.3934L23.2495 6.75042C21.1383 4.63917 18.2217 3.33333 15 3.33333C8.55668 3.33333 3.33333 8.55668 3.33333 15C3.33333 21.4433 8.55668 26.6667 15 26.6667C21.4433 26.6667 26.6667 21.4433 26.6667 15H30C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C19.1422 0 22.8922 1.67893 25.6067 4.3934Z"
          fill="url(#luxGradient)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 15 15"
            to="360 15 15"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </path>
        <defs>
          <linearGradient id="luxGradient" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="1" />
            <stop offset="0.5" stopColor="#e0e0e0" />
            <stop offset="1" stopColor="#a3c8f5" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};
