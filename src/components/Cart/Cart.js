import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    const total = cart.reduce((total, product) => total + product.price, 0)

    let shipping = 0;
    
    
    if(total > 35) {
        shipping = 0;
    }
    else{
        shipping = 12.99;
    }
    const tax = total/10;
    
    return (
        <div className="cart">
            <h3>Ordered Summary</h3>
            <h4>Ordered Items: {cart.length} </h4>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax: {tax.toFixed(2)}</small></p>
            <p>Grand Total: {(total + shipping + tax).toFixed(2)}</p>
        </div>
    );
};

export default Cart;