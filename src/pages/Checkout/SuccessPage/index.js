import React, { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../../components/spinner';

import styles from './styles.scss';

export function SuccessPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer1 = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);


  return (
    <div className={styles.container}>
      {isLoading ? <LoadingSpinner/> : <span>Compra Finalizada!</span>}
    </div>
  )
}
