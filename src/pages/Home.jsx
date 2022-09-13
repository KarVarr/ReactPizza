import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import Sort from '../components/Sort';
import axios from 'axios';

export default function Home() {
  //REDUX
  const dispatch = useDispatch();
  const categoryId = useSelector(state => state.filter.categoryId);
  const sortType = useSelector(state => state.filter.sort.sortProperty);
  const currentPage = useSelector(state => state.filter.currentPage);

  //USE STATE/USE CONTEXT
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //CONST
  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  const onChangeSort = id => {
    dispatch(setCategoryId(id));
  };

  //AXIOS/FETCH
  useEffect(() => {
    // fetch(
    //   `https://630e257b109c16b9abf5a964.mockapi.io/items?page=${currentPage}&limit=15&${
    //     categoryId > 0 ? `category=${categoryId}` : ''
    //   }&sortBy=${sortType?.replace('-', '')}&order=${
    //     sortType?.includes('-') ? 'desc' : 'asc'
    //   }`
    // )
    //   .then(res => res.json())
    //   .then(arr => setItems(arr));
    setIsLoading(true);
     axios
      .get(
        `https://630e257b109c16b9abf5a964.mockapi.io/items?page=${currentPage}&limit=15&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType?.replace('-', '')}&order=${
          sortType?.includes('-') ? 'desc' : 'asc'
        }`
      )
      .then(res => setItems(res.data));
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
      <div className='content__items'>{isLoading ? skeleton : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}
