import React, { useState } from 'react';
import './Shop.css'
import fakeData from '../../fakeData'
import Product from '../Product/Product';

const Shop = () => {
    const firstTen = fakeData.slice(0, 10);
    const [products, setProducts] = useState(firstTen)
    const [cart, setCart] = useState([])
    
    const addProductHandler = (product) => {
        console.log('product added',product)
        const newCart = [...cart, product]
        setCart(newCart)
    };
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product addProductHandler = {addProductHandler} product={product}></Product>)
                }
            </div>
            <div className="cart-container">
                <h2>this is cart</h2>
                <h5>Cart Overview: {cart.length}</h5>
            </div>
        </div>
    );
};

export default Shop;