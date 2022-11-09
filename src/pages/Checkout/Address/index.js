import React from 'react';
import { useLocation } from "react-router-dom";

export function CheckoutAddressPage() {
  const { state } = useLocation();

  console.log('CheckoutAddressPage', state);

  return (
    <div>index</div>
  )
}
