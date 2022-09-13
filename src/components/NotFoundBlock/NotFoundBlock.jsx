import React from 'react';
import styles from './NotFoundBlock.module.scss'

const img404 =
  'https://woobro.design/thumbnails/30/page-not-found-404-error-vector-illustration-5de1881dd11bc.png';


const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>4 O 4</h1>
      <span className={styles.img}>
        <img src={img404} alt="NotFoundImg" />
      </span>
      <h2>Ничего не найдено</h2>
      <p>К сожалению данная страница отсуствует в нашем интернет магазине!</p>
    </div>
  );
};

export default NotFoundBlock;
