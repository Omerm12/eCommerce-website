import React, { useContext } from "react";
import './ProductDisplay.css';
import { ShopContext } from "../Context/ShopContext";

const ProductDisplay = ({ product = {} }) => {
    const { addToCart } = useContext(ShopContext);

    if (!product) {
        return <div>No product data available</div>;
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image || 'default-image-url'} alt="" />
                    <img src={product.image || 'default-image-url'} alt="" />
                    <img src={product.image || 'default-image-url'} alt="" />
                    <img src={product.image || 'default-image-url'} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className="productddisplay-main-img" src={product.image || 'default-image-url'} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name || 'Product Name'}</h1>
                <div className="productdisplay-prices">
                    <div className="productdisplay-prices-old">${product.old_price || '0.00'}</div>
                    <div className="productdisplay-prices-new">${product.new_price || '0.00'}</div>
                </div>
                <div className="productdisplay-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className='productdisplay-category'><span>Category : </span>{product.category || 'Category'}</p>
            </div>
        </div>
    );
}

export default ProductDisplay;
