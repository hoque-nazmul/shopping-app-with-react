import React, { useState, useEffect } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect (() => {
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)
        
        if(products.length > 0){
            const cartProduct = productKeys.map(key => {
                const getProduct = products.find(pd => pd.key === key)
                getProduct.quantity = saveCart[key]
                return getProduct;
                
            })
            setCart(cartProduct)
        }
        
    }, [products])
    
    const addProductHandler = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)

        let count = 1;
        let newCart;

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const othersProduct = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...othersProduct, sameProduct] 
        }else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        
        setCart(newCart)

        const similarProduct = newCart.filter(pd => pd.key === product.key)
        const productCount = similarProduct.length;

        addToDatabaseCart(product.key, productCount)
    };
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product key={product.key} showAddCartBtn={true} addProductHandler = {addProductHandler} product={product}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="btnAddToCart">Order Review</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;