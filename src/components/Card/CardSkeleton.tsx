import style from './CardSkeleton.module.scss';

const CardSkeleton = () => (
  <div className={style.cardWrapper}>
    <svg
      width="224"
      height="336"
      viewBox="0 0 224 336"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Loading card skeleton"
    >
      {/* Карточка */}
      <rect x="0.5" y="0.5" width="223" height="335" rx="16" className={style.cardRect} />
      {/* Анимация скелетона сверху */}
      <rect x="0" y="0" width="224" height="336" rx="16" className={style.skeletonShimmer} />
    </svg>
  </div>
);

export default CardSkeleton;
