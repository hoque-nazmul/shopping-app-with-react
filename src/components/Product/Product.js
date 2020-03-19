import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const {name, img, seller, price, stock, key} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                {props.showAddCartBtn === true &&
                <button onClick={() => props.addProductHandler(props.product)} className="btnAddToCart"><FontAwesomeIcon icon={faShoppingCart} /><span style={{ marginLeft: '5px' }}>Add to Cart</span></button>
                }
            </div>
        </div>
    );
};

export default Product;