import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';

const Shipment = () => {
    const [shipInfo, setShipInfo] = useState(null)
    const [orderId, setOrderId] = useState(null);
    const stripePromise = loadStripe('pk_test_PehX3Q6sMAhiG3KyjciAzBNo00LgRIm1kE');
    const auth = useAuth();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        setShipInfo(data);
    }

    const handlePlaceOrder = (payment) => {
        const savedCart = getDatabaseCart();
        const email = auth.user.email;
        const shippment = shipInfo;
        const paymentInfo = payment;
        const orderDetails = { email: email, cart: savedCart, shippment:shippment, payment:paymentInfo }
        fetch('https://shrouded-garden-81115.herokuapp.com/orderPlaced', {
            method: 'POST',
            body: JSON.stringify(orderDetails),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(data => {
                setOrderId(data._id);
                processOrder();
            })
    }
    return (
        <div className="ship-form-wrapper">
            <div className="container">
            <div className="row justify-content-between">
                <div style={{ display: shipInfo && 'none' }} className="col-md-5">
                    <h2>Shipping Information</h2>
                    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Your Name" />
                        {errors.name && <span>Name is required</span>}
                        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your Email" />
                        {errors.email && <span>Email is required</span>}
                        <input name="address" ref={register({ required: true })} placeholder="Your Address" />
                        {errors.address && <span>Address is required</span>}
                        <input name="address-optional" ref={register} placeholder="Your address 2 (Optional)" />
                        <input name="city" ref={register({ required: true })} placeholder="Your City" />
                        {errors.city && <span>City is required</span>}
                        <input name="country" ref={register({ required: true })} placeholder="Your Country" />
                        {errors.country && <span>Country is required</span>}
                        <input name="zipcode" ref={register({ required: true })} placeholder="Your Zipcode" />
                        {errors.zipcode && <span>Zipcode is required</span>}

                        <input className="btn btn-success" type="submit" />
                    </form>
                </div>
                <div style={{ display: shipInfo ? 'block' : 'none' }} className="col-md-5">
                    <h2 style={{ marginBottom: "25px" }}>Payment Information</h2>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm handlePlaceOrder={handlePlaceOrder} />
                    </Elements>
                </div>

                {
                    orderId && 
                    <div>
                        <h3>Order Succssfully Placed....</h3>
                        <p>Your order id is {orderId}</p>
                    </div>
                }
            </div>
            </div>
        </div>
    )
};

export default Shipment;