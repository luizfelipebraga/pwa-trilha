import React from 'react';
import { useLocation } from "react-router-dom";
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
  const talonPropsPrice = usePriceSummary();
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

  const { shipping } = talonPropsPrice;

  let sedex = shipping[0].selected_shipping_method.amount.value;

  console.log('CheckoutAddressPage', state);

  const heading = formatMessage({
    id: 'checkoutPage.clientCheckoutAddress',
    defaultMessage: 'Endereco de Entrega'
  })

  const headingCard = state.length > 1 ? <span>Produtos</span> : <span>Produto</span>;

  const addressBookElement = <AddressBook
    activeContent={activeContent}
    toggleActiveContent={toggleAddressBookContent}
    onSuccess={scrollShippingInformationIntoView}
  />;

  return (
    <div className={styles.root}>
      <h1 className={styles.checkoutTitle}>{heading}</h1>
      <div>index</div>
      <div className={styles.wrapperShippingResumeOrder}>
        <ScrollAnchor ref={shippingInformationRef}>
          <ShippingInformation
            onSave={setShippingInformationDone}
            onSuccess={scrollShippingInformationIntoView}
            toggleActiveContent={toggleAddressBookContent}
            toggleSignInContent={toggleSignInContent}
            setGuestSignInUsername={setGuestSignInUsername}
          />
        </ScrollAnchor>

        <div className={styles.boxCardAmountProduct}>
          <h2>Resumo do Pedido</h2>
          <span>{state.length} - {headingCard}</span>
        </div>
      </div>
      {addressBookElement}

      <div className={styles.boxAddressMethod}>
        <h1>Método de Entrega</h1>
        <ul>
          <li className={styles.radioBox}>
            <input type="radio" id="shipping" name="shipping" value={sedex} onClick={() => setCepRadio(sedex)} />
            <label for="shipping">Sedex - <strong>{`R$ ${sedex},00`}</strong></label>
          </li>

          <li className={styles.radioBox}>
            <input type="radio" id="shipping" name="shipping" value={0} onClick={() => setCepRadio(0)} />
            <label for="shipping">PAC - <strong>{`R$ 0,00`}</strong></label>
          </li>
        </ul>
      </div>
    </div>
  )
}
