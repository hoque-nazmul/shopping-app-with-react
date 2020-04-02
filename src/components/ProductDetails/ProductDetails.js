import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch('http://localhost:4000/product/'+productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
        })
    }, [productKey])
    
 

    return (
        <div>
            {
                product && <Product showAddCartBtn={false} product = {product}></Product>
            }
            
        </div>
    );
};

export default ProductDetails;