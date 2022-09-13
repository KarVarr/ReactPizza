import React from 'react'
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/emptyCart.png'

export const CartEmpty = () => {
  return (
    <div class='cart cart--empty'>
      <h2>Cart is empty !</h2>
      <p>
        To order pizza, go to the main page.
      </p>
      <img src={cartEmptyImg} alt='Empty cart' />
      <Link to='/' class='button button--black'>
        <span>Go Back</span>
      </Link>
    </div>
  );
}
