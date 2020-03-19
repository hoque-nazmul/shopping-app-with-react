import React from 'react';
import './ReviewProduct.css'

const ReviewProduct = (props) => {
    // console.log(props.product);

    const {name, quantity, key, price} = props.product;
    return (
        <div className="ReviewProduct">
            <div className="ReviewLeft">
                <h2>{name}</h2>
                <p>Quantity: {quantity}</p>
                <p><small>price : {price * quantity}</small></p>
                <button className="btnAddToCart" onClick={() => props.removeBtnHandler(key)}>Remove</button>
            </div>
            
        </div>
    );
};

export default ReviewProduct;