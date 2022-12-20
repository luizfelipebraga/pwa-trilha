import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useIntl } from 'react-intl';
import { ArrowDown, ArrowUp } from 'react-feather';
import styles from './styles.scss';

import { useMiniCart } from '@magento/peregrine/lib/talons/MiniCart/useMiniCart';
import operations from '@magento/venia-ui/lib/components/MiniCart/miniCart.gql';


import VisaImg from '../../../assets/visa.png';
import { CardOrderSummaryPayment } from '../../../components/Checkout/OrderSummaryPayment';

export function CheckoutPaymentPage() {
  const { state } = useLocation();
  const { formatMessage } = useIntl();
  let history = useHistory();
  const orderData = state;
  console.log('orderData', orderData)

  const [paymentRadio, setPaymentRadio] = useState(1);

  const [card, setCard] = useState('');
  const [cardHolder, setCardHolders] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cvvNumber, setCvvNumber] = useState('');
  const [isArrowOpen, setIsArrowOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const talonProps = useMiniCart({ isOpen, setIsOpen, operations });

  const {
    handleRemoveItem
  } = talonProps;

  const handleRemoveOrderItems = async () => {
    for (let value of orderData) {
      const { uid } = value;
      await handleRemoveItem(uid);
    }
  }

  const ArrowIcon = isArrowOpen ? <ArrowUp /> : <ArrowDown />

  const handleCardDisplay = () => {
    const rawText = [...card.split(' ').join('')] // Remove old space
    const creditCard = [] // Create card as array
    rawText.forEach((t, i) => {
      if (i % 4 === 0) creditCard.push(' ') // Add space
      creditCard.push(t)
    })
    return creditCard.join('') // Transform card array to string
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

  const handleArrowClick = () => {
    setIsArrowOpen(!isArrowOpen);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRemoveOrderItems();
    history.push('/checkout-success');
  }

  const hundlePrice = (number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
  }

  const titleCard = orderData.length > 1 ? <span>Produtos</span> : orderData[0].quantity > 1 ? <span>Produtos</span> : <span>Produto</span>;
  const orderResumeQnt = verifyProductAmount();
  const shippingFormatted = hundlePrice(orderData.shipping);
  const totalValue = hundlePrice(orderData.total.value);

  const heading = formatMessage({
    id: 'checkoutPage.clientCheckoutAddress',
    defaultMessage: 'PAGAMENTO'
  })

  const boletoForm = (
    <button className={styles.buttonStyled}>Fazer o Pagamento do boleto</button>
  )

  const creditCardForm = (
    <form className={styles.formPayment} onSubmit={handleSubmit}>
      <div>
        <label>CARD NUMBER</label>
        <div className={styles.wrapperCardBox}>
          <input id="creditCardInput"
            maxLength={20}
            type="numeric"
            value={handleCardDisplay()}
            onChange={(e) => setCard(e.target.value)}
          />

          <img src={VisaImg} alt="Visa" />
        </div>
      </div>

      <div>
        <label htmlFor="cardHolder" id='cardHolder'>CARDHOLDER NAME</label>
        <input id="cardHolder" value={cardHolder} type="text" placeholder='John Doe' onChange={(event) => setCardHolders(event.target.value)} required />
      </div>

      <div>
        <label htmlFor="expireDate" id='expireDate'>EXPIRE DATE</label>
        <input id="expireDate"
          type="date"
          placeholder='05 / 21'
          value={expireDate}
          onChange={(event) => setExpireDate(event.target.value)}
          maxlength={6}
          required
        />
      </div>

      <div>
        <label htmlFor="cvv" id='cvv'>CVV</label>
        <input id="cvv" value={cvvNumber} type="text" placeholder='123' maxLength={3} onChange={(event) => setCvvNumber(event.target.value)} required />
      </div>

      <div>
        <button className={styles.buttonStyled} type="submit">Fazer a compra</button>
      </div>
    </form>
  )

  return (
    <div className={styles.root}>
      <div className={styles.wrappingContent}>
        <div>
          <h1 className={styles.checkoutTitle}>{heading}</h1>
          <ul>
            <li className={styles.boxRadio}>
              <input type="radio" id="boleto" checked={paymentRadio === 1} name="boleto" value={1} onClick={() => setPaymentRadio(1)} />
              <label for="boleto">Boleto</label>
            </li>

            <li className={styles.boxRadio}>
              <input type="radio" id="credito" name="credito" checked={paymentRadio === 0} value={0} onClick={() => setPaymentRadio(0)} />
              <label for="credito">Cartão de Crédito</label>
            </li>
          </ul>

          {paymentRadio === 0 ? creditCardForm : boletoForm}
        </div>

        <aside className={styles.aside}>
          <h2>Resumo do Pedido</h2>

          <div className={styles.orderSummary}>
            <span>Frete : {shippingFormatted}</span>
            <span>Total : <strong>{totalValue}</strong></span>
          </div>

          <div className={styles.wrapperProductsLength}><span>{orderResumeQnt + orderData.length}  {titleCard}</span> <div onClick={handleArrowClick}>{ArrowIcon}</div></div>
          {isArrowOpen && orderData.map(({ product, quantity }, i) => (
            <CardOrderSummaryPayment key={i} name={product.name} url={product.thumbnail.url} qty={quantity} />
          ))}
        </aside>

      </div>
    </div>
  )
}
