import React from 'react';
import { useLocation } from "react-router-dom";
import { useIntl } from 'react-intl';
import styles from './styles.scss';
import { useCheckoutPage } from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';
import ScrollAnchor from '@magento/venia-ui/lib/components/ScrollAnchor/scrollAnchor';
import ShippingInformation from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation';
import AddressBook from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook';

export function CheckoutAddressPage() {
  const { state } = useLocation();
  const { formatMessage } = useIntl();

  console.log('CheckoutAddressPage', state);

  const heading = formatMessage({
    id: 'checkoutPage.clientCheckoutAddress',
    defaultMessage: 'Endereco de Entrega'
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

  const addressBookElement = <AddressBook
    activeContent={activeContent}
    toggleActiveContent={toggleAddressBookContent}
    onSuccess={scrollShippingInformationIntoView}
  />;

  return (
    <div className={styles.root}>
      <h1 className={styles.checkoutTitle}>{heading}</h1>
      <div>index</div>
      <div>
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
      {addressBookElement}
    </div>
  )
}
