import React, { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../../components/spinner';
import checkBoxImg from './images/Checkbox.png';

import styles from './styles.scss';

export function SuccessPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  return (
    <div className={styles.container}>
      {isLoading ? <LoadingSpinner /> :
        <>
          <div className={styles.BoxCheckImage}>
            <img src={checkBoxImg} alt="check icon" />
          </div>
          <span>Seu pedido foi feito com sucesso!</span>
        </>
      }
    </div>
  )
}
