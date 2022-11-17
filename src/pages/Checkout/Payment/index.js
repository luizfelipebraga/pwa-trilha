import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useIntl } from 'react-intl';
import styles from './styles.scss';

export function CheckoutPaymentPage() {
  const { state } = useLocation();
  const { formatMessage } = useIntl();

  const [paymentRadio, setPaymentRadio] = useState(1);
  const [card, setCard] = useState('')

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
    defaultMessage: 'Pagamento'
  })

  const creditCardCheck = paymentRadio === 1 && (
    <form>
      <label for="boleto">Boleto</label>
      <input id="ccn"
        type="tel"
        inputmode="numeric"
        pattern="[0-9\s]{13,19}"
        autocomplete="cc-number"
        maxlength="19"
        placeholder="xxxx xxxx xxxx xxxx" />
    </form>
  )

  return (
    <div className={styles.root}>
      <h1 className={styles.checkoutTitle}>{heading}</h1>
      <div>index</div>
      <ul>
        <li className={styles.radioBox}>
          <input type="radio" id="boleto" checked={paymentRadio === 1} name="boleto" value={1} onClick={() => setPaymentRadio(1)} />
          <label for="boleto">Boleto</label>
        </li>

        <li className={styles.radioBox}>
          <input type="radio" id="credito" name="credito" checked={paymentRadio === 0} value={0} onClick={() => setPaymentRadio(0)} />
          <label for="credito">Cartão de Crédito</label>
        </li>
      </ul>

      <form>
        <label for="creditCardInput">Boleto</label>
        <input id="creditCardInput" maxLength={20} pattern="[0-9]" type="numeric" value={handleCardDisplay()} onChange={(e) => setCard(e.target.value)}/>

      </form>
    </div>
  )
}
