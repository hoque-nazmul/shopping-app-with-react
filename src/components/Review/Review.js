import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import Cart from '../Cart/Cart';
import './Review.css'
// import thanksImg from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const auth = useAuth();
    const [cart, setCart] = useState([])
    // const [placedOrder, setPlacedOrder] = useState(false)

    // const handlePlaceOrder = () => {
    //     setCart([])
    //     setPlacedOrder(true)
    //     processOrder()
    // }


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

    // let thankyou;
    // if (placedOrder) {
    //     thankyou = <img src={thanksImg} alt=""/>
    // }
  
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
                {/* { thankyou } */}
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