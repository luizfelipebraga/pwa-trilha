import { useLocation } from "react-router-dom";

export function CheckoutPaymentPage() {
  const { state } = useLocation();

  console.log('CheckoutAddressPage', state);

  return (
    <div>index</div>
  )
}
