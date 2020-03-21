import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const auth = useAuth();
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => { console.log(data) }

    console.log(watch('example')) // watch input value by passing the name of it

    return (

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
    )
};

export default Shipment;