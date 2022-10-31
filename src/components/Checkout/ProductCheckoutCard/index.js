import React from 'react';
import Image from '@magento/venia-ui/lib/components/Image/index.js';
import styles from './styles.scss';

export function ProductCheckoutCard({ img, productName, price, qtd, }) {
  return (
    <div className={styles.container}>
      <img src={img} alt={productName} width={200} height={200} />
      <p>{productName}</p>
      <span>{price}</span>
      <input type="text" value={qtd} />
      <span>{price}</span>
    </div>
  )
}
