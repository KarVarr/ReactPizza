import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice.js';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import Sort from '../components/Sort';
import axios from 'axios';

const img404 =
  'https://woobro.design/thumbnails/30/page-not-found-404-error-vector-illustration-5de1881dd11bc.png';


export default function Home() {
  //REDUX
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.pizza);
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);

  //USE STATE/USE CONTEXT
  const { searchValue } = useContext(SearchContext);

  //CONST
  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  const onChangeSort = id => {
    dispatch(setCategoryId(id));
  };

  //AXIOS/FETCH
  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        categoryId,
        currentPage,
        sort,
      })
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //parsing parametrs in first loading
  useEffect(() => {}, []);

  //PIZZA MAP
  const pizzas = items
    .filter(obj => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map(obj => (
      <PizzaBlock
        key={obj.id}
        title={obj.title}
        price={obj.price}
        imageUrl={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
      />
    ));

  const skeleton = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className='content__top'>
        <Categories value={categoryId} onChangeSort={onChangeSort} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error'>
          <h2>Oops...</h2>
          <img src={img404} alt='error' />
          <p>Something went wrong, reload the page!</p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading' ? skeleton : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}
