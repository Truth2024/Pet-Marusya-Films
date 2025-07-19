import style from './heroLoader.module.scss';
const HeroLoader = () => (
  <div className={style.heroWrapper}>
    <svg width="1280" height="625" viewBox="0 0 1350 625" xmlns="http://www.w3.org/2000/svg">
      {/* Заголовок (было y=22, стало 22+73=95) */}
      <rect x="9" y="90" width="400" height="40" rx="16" className={style.rect} />

      {/* Описание (было y=70, стало 70+73=143) */}
      <rect x="5" y="143" width="530" height="100" rx="28" className={style.rect} />

      {/* Карточка (было y=186, стало 186+73=259) */}
      <rect x="4" y="259" width="530" height="160" rx="28" className={style.rect} />

      {/* Кнопки (было y=366, стало 366+73=439) */}
      <rect x="7" y="439" width="171" height="56" rx="28" className={style.rect} />
      <rect x="193" y="439" width="183" height="56" rx="28" className={style.rect} />
      <rect x="390" y="439" width="68" height="56" rx="28" className={style.rect} />
      <rect x="468" y="439" width="68" height="56" rx="28" className={style.rect} />

      {/* Правый блок (остается на месте) */}
      <rect x="670" y="0" width="680" height="552" rx="16" className={style.rect} />
    </svg>
  </div>
);

export default HeroLoader;
