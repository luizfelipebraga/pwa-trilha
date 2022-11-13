import React from 'react';
import { useLocation } from "react-router-dom";
import { useIntl } from 'react-intl';
import styles from './styles.scss';

export function CheckoutPaymentPage() {
  const { state } = useLocation();
  const { formatMessage } = useIntl();

  console.log('CheckoutAddressPage', state);
  
  const heading = formatMessage({
    id: 'checkoutPage.clientCheckoutAddress',
    defaultMessage: 'Pagamento'
  })

  return (
    <div className={styles.root}>
      <h1 className={styles.checkoutTitle}>{heading}</h1>
      <div>index</div>
    </div>
  )
}
