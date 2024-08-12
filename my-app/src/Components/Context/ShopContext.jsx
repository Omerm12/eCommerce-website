import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_product, setALL_Product] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setALL_Product(data))
            .catch((error) => console.error('Failed to fetch products:', error));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: ""
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Assuming data contains the cart items in the correct structure
                setCartItems(prev => ({ ...prev, ...data }));
            })
            .catch((error) => console.error('Failed to fetch cart items:', error));
        }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Failed to add to cart:', error));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedItems = { ...prev, [itemId]: (prev[itemId] || 0) - 1 };
            if (updatedItems[itemId] <= 0) {
                delete updatedItems[itemId];
            }
            return updatedItems;
        });
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Failed to remove from cart:', error));
        }
    }

    const getTotalCartFee = () => {
        let totalFee = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalFee += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalFee;
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalAmount += cartItems[item];
            }
        }
        return totalAmount;
    }

    const searchProducts = async (query) => {
        if (!query) return;
        try {
            const url = `http://localhost:4000/search?query=${encodeURIComponent(query)}`;
            console.log('Request URL:', url);
    
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token') || '',
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            if (result && result.products) {
                setSearchResults(result.products);
            } else {
                console.error('Unexpected response format:', result);
            }
        } catch (error) {
            console.error('Failed to fetch search results:', error);
        }
    }
    const contextValue = {
        getTotalCartAmount,
        getTotalCartFee,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        searchResults, // Add search results to context
        searchProducts // Add search function to context
    };

    return (
        
        <ShopContext.Provider value={contextValue}>
        {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
