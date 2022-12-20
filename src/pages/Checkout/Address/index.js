import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useIntl } from 'react-intl';
import styles from './styles.scss';
import { useCheckoutPage } from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';
import ScrollAnchor from '@magento/venia-ui/lib/components/ScrollAnchor/scrollAnchor';
import ShippingInformation from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation';
import AddressBook from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook';
import { CardOrderSummaryPayment } from '../../../components/Checkout/OrderSummaryPayment';
import { ArrowDown, ArrowUp } from 'react-feather';

export function CheckoutAddressPage() {
  const { state } = useLocation();
  const { formatMessage } = useIntl();

  const orderData = state;

  const heading = formatMessage({
    id: 'checkoutPage.clientCheckoutAddress',
    defaultMessage: 'Endereco de Entrega'
  })

  const headingAddressShipping = formatMessage({
    id: 'checkoutPage.clientCheckoutAddress',
    defaultMessage: 'Método de Entrega'
  })

  const [isArrowOpen, setIsArrowOpen] = useState(false);
  const ArrowIcon = isArrowOpen ? <ArrowUp /> : <ArrowDown />


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


  const handleArrowClick = () => {
    setIsArrowOpen(!isArrowOpen);
  }

  const verifyProductAmount = () => {
    let index = 0;
    for (let value of orderData) {
      if (value.quantity != 1) {
        index = (index + value.quantity) - 1;
      }
    }
    return index;
  }

  const titleCard = orderData.length > 1 ? <span>Produtos</span> : orderData[0].quantity > 1 ? <span>Produtos</span> : <span>Produto</span>;
  const orderResumeQnt = verifyProductAmount();

  const shippingFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orderData.shipping);
  const [cepRadio, setCepRadio] = useState(orderData.shipping);

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

        <aside className={styles.aside}>
          <h2>Resumo do Pedido</h2>
          <div className={styles.wrapperProductsLength}><span>{orderResumeQnt + orderData.length}  {titleCard}</span> <div onClick={handleArrowClick}>{ArrowIcon}</div></div>
          {isArrowOpen && orderData.map(({ product, quantity }, i) => (
            <CardOrderSummaryPayment key={i} name={product.name} url={product.thumbnail.url} qty={quantity} />
          ))}
        </aside>
      </div>
      {addressBookElement}

      <div className={styles.boxMethodShipping}>
        <h1 className={styles.checkoutTitle}>{headingAddressShipping}</h1>

        <ul>
          <li className={styles.radioBox}>
            <input type="radio" id="shipping" checked={cepRadio === orderData.shipping} name="shipping" value={orderData.shipping} onClick={() => setCepRadio(orderData.shipping)} />
            <label for="shipping">Sedex - <strong>{shippingFormatted}</strong></label>
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
            Ir para o Pagamento
          </button>
        </Link>
      </div>
    </div>
  )
}
