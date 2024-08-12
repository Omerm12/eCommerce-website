import React, { useContext } from "react";
import './CartItems.css';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItem = () => {
    const {getTotalCartFee, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    return (
        <div className="cartitems">
            <div className="cart-items-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] && cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cart-items-format-main">
                                <img src={e.image} alt="" className="carticon-product-icon" />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img className="cartitems-remove-icon" src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="Remove" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div className="cartitems-totalitems">
                        <p>Subtotal</p>
                        <p>${getTotalCartFee()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-totalitems">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-totalitems">
                        <h3>Total</h3>
                        <h3>${getTotalCartFee()}</h3>
                    </div>
                    <button>PROCEES TO CHECKOUT</button>
                </div>
            </div>                
        </div>
    );
};

export default CartItem;