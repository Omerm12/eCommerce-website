import React from 'react';
import './SearchBar.css';
import search_icon from '../Assets/cart_icon.png';
import close_icon from '../Assets/cart_cross_icon.png';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="search-bar-container">
            <input 
                className="search-bar" 
                type="text" 
                placeholder="Search..."  
                value={value}
                onChange={onChange}
            />
            <img src={search_icon} className="search" alt="Search" onClick={handleSearch} />
            {value && <img src={close_icon} className="close" alt="Clear" onClick={onClearSearch} />}
        </div>
    );
}

export default SearchBar;
