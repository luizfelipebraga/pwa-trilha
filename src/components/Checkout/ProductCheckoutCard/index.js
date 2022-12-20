import React from 'react';
import Image from '@magento/venia-ui/lib/components/Image/index.js';
import styles from './styles.scss';

export function ProductCheckoutCard({ img, productName, price, qtd, }) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Image src={img} alt={productName} width={100} height={100} />
        <p className={styles.title}>{productName}</p>
        <div className={styles.boxPrice}>
          <span>{`R$ ${price},00`}</span>
          <input type="text" value={qtd} />
          <span>{`R$ ${price*qtd},00`}</span>
        </div>
      </div>
    </div>
  )
}
