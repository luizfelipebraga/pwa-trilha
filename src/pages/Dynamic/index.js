import React from 'react'
import styles from './styles.scss';

function DynamicPage(product) {

  const { image, title, reviews, price } = product;

  return (
    <div className={styles.container}>
      <div className={styles.productContent}></div>
      <div className={styles.productAbout}></div>
    </div>
  )
}

export default DynamicPage;