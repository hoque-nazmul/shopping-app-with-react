import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import Cart from '../Cart/Cart';
import './Review.css'
import thanksImg from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([])
    const [placedOrder, setPlacedOrder] = useState(false)

    const handlePlaceOrder = () => {
        setCart([])
        setPlacedOrder(true)
        processOrder()
    }


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

    let thankyou;
    if (placedOrder) {
        thankyou = <img src={thanksImg} alt=""/>
    }
  



    return (
        <div className="review-container">
            <div className="review-content">
                {
                    cart.map(product => <ReviewProduct 
                        key = {product.key} 
                        removeBtnHandler = {removeBtnHandler}
                        product = {product}>
                        </ReviewProduct>)
                }
                { thankyou }
            </div>
            <div className="review-cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="btnAddToCart">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;