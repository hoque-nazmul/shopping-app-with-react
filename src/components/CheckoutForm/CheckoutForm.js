import React from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = (props) => {
  const [errorPayment, setErrorPayment] = useState(null)
  const [successPayment, setSuccessPayment] = useState(null)

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if(error) {
      setErrorPayment(error.message);
      setSuccessPayment(null)
    }
    if(paymentMethod){
      setSuccessPayment("Payment successfully done!");
      console.log(paymentMethod);
      const payment = {id: paymentMethod.id, last4: paymentMethod.card.last4}
      props.handlePlaceOrder(payment)
      setErrorPayment(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="btn btn-info" style={{ margin:'20px 0px' }} type="submit" disabled={!stripe}>
        Pay
      </button>
      {
        errorPayment && <p style={{ color: 'red' }}>{errorPayment}</p>
      }
      {
        successPayment && <p style={{ color: 'green' }}>{successPayment}</p>
      }
    </form>
  );
};

export default CheckoutForm;