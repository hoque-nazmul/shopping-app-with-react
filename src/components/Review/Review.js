import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import Cart from '../Cart/Cart';
import './Review.css'

const Review = () => {

    
    const [cart, setCart] = useState([])

    const removeBtnHandler = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productkeys = Object.keys(saveCart)
        // console.log(productkeys)return ["B01K1IO3QW", "B06Y4GZS9C", "B01DBGVB7K", "B01LZ2WZGH", "B01LT692RK"]
        const cartProduct = productkeys.map(key => {
            const getProduct = fakeData.find(pd => pd.key === key)
            getProduct.quantity = saveCart[key];
            return getProduct;
        })
        setCart(cartProduct);
    }, [])


  



    return (
        <div className="review-container">
            <div className="review-content">
                <h2>Product Items {cart.length}</h2>
                {
                    cart.map(product => <ReviewProduct 
                        key = {product.key} 
                        removeBtnHandler = {removeBtnHandler}
                        product = {product}>
                        </ReviewProduct>)
                }
            </div>
            <div className="review-cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;