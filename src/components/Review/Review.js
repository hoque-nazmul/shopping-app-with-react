import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import Cart from '../Cart/Cart';
import './Review.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const auth = useAuth();
    const [cart, setCart] = useState([])


    const removeBtnHandler = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productkeys = Object.keys(saveCart)
        fetch('https://shrouded-garden-81115.herokuapp.com/getProductByKeys', {
            method: 'POST',
            body: JSON.stringify(productkeys),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(res => res.json())
          .then(data => {
                const cartProduct = productkeys.map(key => {
                    const getProduct = data.find(pd => pd.key === key)
                    getProduct.quantity = saveCart[key];
                    return getProduct;
                })
                setCart(cartProduct);
          })
    }, [])

    
  
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
                {
                    !cart.length && <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Your Cart is Empty ! <a href="/shop">Keep Shopping</a></h2>
                }
            </div>
            <div className="review-cart-container">
                <Cart cart={cart}>
                    {/* <button onClick={handlePlaceOrder} className="btnAddToCart">Place Order</button> */}
                    <Link to="/shipment">
                        {
                            auth.user ?  <button className="btnAddToCart">Proceed Checkout</button> :
                            <button className="btnAddToCart">Login to Proceed</button>
                        }
                        
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;