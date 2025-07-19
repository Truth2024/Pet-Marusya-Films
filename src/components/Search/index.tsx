import React from 'react';
import debounce from 'lodash.debounce';
import { SearchCard } from '../SearchCard';
import styles from './search.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFilmsSearch } from '../../features/thunk/selectors';
import { fetchFilmsSearch } from '../../features/thunk/FilmSearch';

export const Search = () => {
  const [value, setValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobileInputVisible, setIsMobileInputVisible] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const searchBlockRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectFilmsSearch);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBlockRef.current &&
        !searchBlockRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsMobileInputVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const debouncedFetch = React.useCallback(
    debounce((search: string) => {
      if (search.trim() !== '') {
        const currentValue = `?title=${search}`;
        dispatch(fetchFilmsSearch({ value: currentValue }));
      }
    }, 500),
    [dispatch],
  );

  React.useEffect(() => {
    debouncedFetch(value);
    return debouncedFetch.cancel;
  }, [value, debouncedFetch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsOpen(true);
  };

  const handleIconClick = () => {
    if (window.innerWidth <= 944) {
      setIsMobileInputVisible(!isMobileInputVisible);
    }
    inputRef.current?.focus();
    setIsOpen(true);

    if (value.trim() === '') {
      dispatch(fetchFilmsSearch({ value: '' }));
    }
  };
  const handleFocus = () => {
    setIsOpen(true);

    if (value.trim() === '') {
      dispatch(fetchFilmsSearch({ value: '' }));
    }
  };
  return (
    <div className={styles.search}>
      <svg
        onClick={handleIconClick}
        className={styles.searchIcon}
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.3591 17.1168L22.6418 21.3995L21.2276 22.8137L16.9449 18.531C15.405 19.763 13.4521 20.5 11.3281 20.5C6.36013 20.5 2.32812 16.468 2.32812 11.5C2.32812 6.532 6.36013 2.5 11.3281 2.5C16.2961 2.5 20.3281 6.532 20.3281 11.5C20.3281 13.624 19.5911 15.5769 18.3591 17.1168ZM16.3528 16.3748C17.5756 15.1146 18.3281 13.3956 18.3281 11.5C18.3281 7.6325 15.1956 4.5 11.3281 4.5C7.46062 4.5 4.32812 7.6325 4.32812 11.5C4.32812 15.3675 7.46062 18.5 11.3281 18.5C13.2237 18.5 14.9427 17.7475 16.2029 16.5247L16.3528 16.3748Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        name="search"
        autoComplete="off"
        type="text"
        placeholder="Поиск..."
        className={`${styles.searchInput} ${isMobileInputVisible ? styles.mobileInputVisible : ''}`}
      />

      <div
        ref={searchBlockRef}
        onClick={(e) => e.stopPropagation()}
        className={`${styles.searchBlock} ${!isOpen ? styles.hidden : ''}`}
      >
        {status === 'loading' && <div className={styles.notFound}>Загрузка...</div>}
        <ul className={styles.searchList}>
          {status === 'succeeded' &&
            (Array.isArray(data) && data.length > 0 ? (
              data.map((item) => <SearchCard onClick={() => setIsOpen(false)} key={item.id} data={item} />)
            ) : (
              <div className={styles.notFound}>Фильмы не найдены</div>
            ))}
          {status === 'failed' && <div className={styles.notFound}>Ошибка загрузки данных</div>}
        </ul>
      </div>
    </div>
  );
};
