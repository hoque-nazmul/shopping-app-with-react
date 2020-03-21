import React from 'react';
import './Cart.css'

const Cart = (props) => {

    const cart = props.cart;
    // console.log(cart);
    const totaltext = cart.reduce((total, product) => total + product.price * product.quantity, 0) 
    const totalNumber  = parseFloat(totaltext)
    const total = totalNumber;
    // * parseFloat(cart.quantity);

    let shipping = 0;
    if(total > 35) {
        shipping = 0;
    }
    else if(total > 0){
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
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;