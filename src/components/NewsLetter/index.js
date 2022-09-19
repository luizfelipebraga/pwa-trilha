import React from 'react';
import styles from './styles.scss';

function NewsLetter() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p>Receba ofertas <br /> e novidades</p>
        <input type="text" placeholder='nome completo' />
        <input type="email" placeholder='e-mail' />
        <button type="submit" className={styles.newsLetterButton}>Enviar</button>
      </div>
    </div>
  )
}
export default NewsLetter;