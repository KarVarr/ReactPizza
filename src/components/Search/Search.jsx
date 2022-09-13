import React, { useCallback, useContext, useRef, useState } from 'react';
import styles from './Search.module.scss';
import searshPizza from '../../assets/img/pizzaCutter.svg';
import searchClose from '../../assets/img/closeSearch.svg';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

export default function Search() {
  const [value, setValue] = useState('');
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();
  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };
  //Random color text in input
  const random1 = Math.floor(Math.random() * 255);
  const random2 = Math.floor(Math.random() * 255);
  const random3 = Math.floor(Math.random() * 255);

  const updateSearchValue = useCallback(
    debounce(str => {
      setSearchValue(str);
    }, 300),
    []
  );

  const onChangeInput = e => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <img
        // style={{
        //   transform: searchValue && 'translateX(220px) rotate(180deg)',
        //   cursor: searchValue && 'pointer'
        // }}
        //onClick={onClickClear}
        className={styles.img}
        src={searshPizza}
        alt='search'
      />
      <input
        ref={inputRef}
        style={{ color: `rgba(${random1},${random2},${random3}` }}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Slice of pizza...'
      />

      <img
        style={{
          transform: searchValue && 'translateX(0) rotate(0)',
          opacity: searchValue && '.6',
        }}
        onClick={onClickClear}
        className={styles.close}
        src={searchClose}
        alt='close'
      />
    </div>
  );
}
