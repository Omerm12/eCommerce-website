import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import SearchBar from "../Search/SearchBar";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [menu, setMenu] = useState("shop");
    const { getTotalCartAmount, searchProducts } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (searchQuery) {
            await searchProducts(searchQuery);
            navigate('/search-results'); // Navigate to the search results page
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="Shop Logo" />
                <p>SHOPPER</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => setMenu("shop")}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
                    {menu === "shop" && <hr />}
                </li>
                <li onClick={() => setMenu("mens")}>
                    <Link style={{ textDecoration: 'none' }} to='/men'>Men</Link>
                    {menu === "mens" && <hr />}
                </li>
                <li onClick={() => setMenu("womens")}>
                    <Link style={{ textDecoration: 'none' }} to='/women'>Women</Link>
                    {menu === "womens" && <hr />}
                </li>
                <li onClick={() => setMenu("kids")}>
                    <Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>
                    {menu === "kids" && <hr />}
                </li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ?
                    <button onClick={() => { 
                        localStorage.removeItem('auth-token'); 
                        window.location.replace('/'); 
                    }}>Logout</button>
                    : <Link to='/login'><button>Login</button></Link>
                }
                <Link to='/cart'>
                    <img src={cart_icon} alt="Cart" />
                </Link>
                <div className="nav-cart-count">{getTotalCartAmount()}</div>
            </div>
            <div className="search-bar-container">
                <SearchBar 
                    value={searchQuery}
                    onChange={({ target }) => setSearchQuery(target.value)}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />
            </div>
        </div>
    );
}

export default Navbar;
