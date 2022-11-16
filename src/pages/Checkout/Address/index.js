import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useIntl } from 'react-intl';
import styles from './styles.scss';
import { useCheckoutPage } from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';
import ScrollAnchor from '@magento/venia-ui/lib/components/ScrollAnchor/scrollAnchor';
import ShippingInformation from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation';
import AddressBook from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook';
import { usePriceSummary } from '@magento/peregrine/lib/talons/CartPage/PriceSummary/usePriceSummary';

export function CheckoutAddressPage() {
  const { state } = useLocation();
  const { formatMessage } = useIntl();

  const orderData = [...state];

  console.log('CheckoutAddressPage', state);
  console.log('orderData', orderData);

  const heading = formatMessage({
    id: 'checkoutPage.clientCheckoutAddress',
    defaultMessage: 'Endereco de Entrega'
  })

  const headingAddressShipping = formatMessage({
    id: 'checkoutPage.clientCheckoutAddress',
    defaultMessage: 'Método de Entrega'
  })

  const talonProps = useCheckoutPage();

  const {
    activeContent,
    setGuestSignInUsername,
    setShippingInformationDone,
    scrollShippingInformationIntoView,
    shippingInformationRef,
    toggleAddressBookContent,
    toggleSignInContent
  } = talonProps;

  // const { flatData } = usePriceSummary();
  // const { shipping } = flatData;

  // let currencyCode = shipping[0].selected_shipping_method.amount.currency;
  // let sedex = shipping[0].selected_shipping_method.amount.value;
  const headingCard = orderData.length > 0 ? <span>Produtos</span> : <span>Produto</span>;


  const [cepRadio, setCepRadio] = useState(1);

  const addressBookElement = <AddressBook
    activeContent={activeContent}
    toggleActiveContent={toggleAddressBookContent}
    onSuccess={scrollShippingInformationIntoView}
  />;

  return (
    <div className={styles.root}>
      <div className={styles.boxAddressShipping}>
        <div>
          <h1 className={styles.checkoutTitle}>{heading}</h1>
          <ScrollAnchor ref={shippingInformationRef}>
            <ShippingInformation
              onSave={setShippingInformationDone}
              onSuccess={scrollShippingInformationIntoView}
              toggleActiveContent={toggleAddressBookContent}
              toggleSignInContent={toggleSignInContent}
              setGuestSignInUsername={setGuestSignInUsername}
            />
          </ScrollAnchor>
        </div>

        <aside>
          <h2>Resumo do Pedido</h2>
          <span>{orderData.length} - {headingCard}</span>
        </aside>
      </div>
      {addressBookElement}

      <div className={styles.boxMethodShipping}>
        <h1 className={styles.checkoutTitle}>{headingAddressShipping}</h1>

        <ul>
          <li className={styles.radioBox}>
            <input type="radio" id="shipping" checked={cepRadio === 1} name="shipping" value={1} onClick={() => setCepRadio(1)} />
            <label for="shipping">Sedex - <strong>{`R$ 15,00`}</strong></label>
          </li>

          <li className={styles.radioBox}>
            <input type="radio" id="shipping" name="shipping" value={0} onClick={() => setCepRadio(0)} />
            <label for="shipping">PAC - <strong>{`R$ 0,00`}</strong></label>
          </li>
        </ul>

        <Link to={{
          pathname: '/checkout-payment',
          state: orderData
        }}>
          <button className={styles.checkoutButton}>
            Ir para o Checkout
          </button>
        </Link>
      </div>
    </div>
  )
}
