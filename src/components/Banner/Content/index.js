import React from 'react';
import truckImage from '../../../assets/truck-banner.png';
import styles from './styles.scss';

const BannerContent = ({ title = '', subtitle = '' }) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.bannerText}>
          <p>{title}</p>
          <p>{subtitle}</p>
        </div>
        <button className={styles.saibaMais}>SAIBA MAIS</button>
      </div>
      <img src={truckImage} alt="truck" />
    </div>
  )
}

export default BannerContent;