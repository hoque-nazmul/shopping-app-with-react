import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const auth = useAuth();

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { 
        const savedCart = getDatabaseCart();
        const email = auth.user.email;
        const orderDetails = {email: email, cart: savedCart}
        fetch('http://localhost:4000/orderPlaced', {
            method: 'POST',
            body: JSON.stringify(orderDetails),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(res => res.json())
          .then(data => {
              console.log("order placed", data);
              alert("Order Successfully Placed with id: ", data._id)
              processOrder();
          }) 
     }

    

    return (
        <div className="ship-form-wrapper">
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Your Name" />
                {errors.name && <span>Name is required</span>}
                <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your Email" />
                {errors.email && <span>Email is required</span>}
                <input name="address" ref={register({ required: true })} placeholder="Your Address" />
                {errors.address && <span>Address is required</span>}
                <input name="address-optional" ref={register} placeholder="Your address 2 (Optional)"/>
                <input name="city" ref={register({ required: true })} placeholder="Your City" />
                {errors.city && <span>City is required</span>}
                <input name="country" ref={register({ required: true })} placeholder="Your Country" />
                {errors.country && <span>Country is required</span>}
                <input name="zipcode" ref={register({ required: true })} placeholder="Your Zipcode" />
                {errors.zipcode && <span>Zipcode is required</span>}
                
                <input className="btn btn-success" type="submit" />
            </form>
        </div>
    )
};

export default Shipment;