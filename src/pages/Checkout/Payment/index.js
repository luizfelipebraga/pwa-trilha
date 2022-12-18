import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useIntl } from 'react-intl';
import styles from './styles.scss';

import VisaImg from '../../../assets/visa.png';

export function CheckoutPaymentPage() {
  const { state } = useLocation();
  const { formatMessage } = useIntl();

  const [paymentRadio, setPaymentRadio] = useState(1);

  const [card, setCard] = useState('');
  const [cardHolder, setCardHolders] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cvvNumber, setCvvNumber] = useState('');

  const handleCardDisplay = () => {
    const rawText = [...card.split(' ').join('')] // Remove old space
    const creditCard = [] // Create card as array
    rawText.forEach((t, i) => {
      if (i % 4 === 0) creditCard.push(' ') // Add space
      creditCard.push(t)
    })
    return creditCard.join('') // Transform card array to string
  }

  console.log('CheckoutAddressPage', state);

  const heading = formatMessage({
    id: 'checkoutPage.clientCheckoutAddress',
    defaultMessage: 'PAGAMENTO'
  })

  const boletoForm = (
    <button className={styles.buttonStyled}>Fazer o Pagamento do boleto</button>
  )

  const creditCardForm = (
    <form className={styles.formPayment}>
      <div>
        <label>CARD NUMBER</label>
        <div className={styles.wrapperCardBox}>
          <input id="creditCardInput"
            maxLength={20}
            pattern="[0-9]"
            type="numeric"
            value={handleCardDisplay()}
            onChange={(e) => setCard(e.target.value)}
          />

          <img src={VisaImg} alt="Visa" />
        </div>
      </div>

      <div>
        <label htmlFor="cardHolder" id='cardHolder'>CARDHOLDER NAME</label>
        <input id="cardHolder" value={cardHolder} type="text" placeholder='John Doe' onChange={(event) => setCardHolders(event.target.value)} />
      </div>

      <div>
        <label htmlFor="expireDate" id='expireDate'>EXPIRE DATE</label>
        <input id="expireDate"
          type="date"
          placeholder='05 / 21'
          value={expireDate}
          onChange={(event) => setExpireDate(event.target.value)}
          maxlength={6}
        />
      </div>

      <div>
        <label htmlFor="cvv" id='cvv'>CVV</label>
        <input id="cvv" value={cvvNumber} type="text" placeholder='123' maxLength={3} onChange={(event) => setCvvNumber(event.target.value)} />
      </div>

      <div>
        <button className={styles.buttonStyled}>Fazer a compra</button>
      </div>
    </form>
  )

  return (
    <div className={styles.root}>
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
  )
}
