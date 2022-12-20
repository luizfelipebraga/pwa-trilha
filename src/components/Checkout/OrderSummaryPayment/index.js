import React from 'react';
import Image from '@magento/venia-ui/lib/components/Image';
import styles from './styles.scss';

export function CardOrderSummaryPayment({name, url, qty}) {
  return (
    <div className={styles.container}>
      <Image src={url} alt={name} height={80} width={80} style={{mixBlendMode: 'color-burn', marginTop: '1rem'}}/>
      <span><strong>{qty}</strong>{name}</span>
    </div>
  )
}
