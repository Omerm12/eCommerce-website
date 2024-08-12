import React, { useContext } from "react";
import { ShopContext } from "../Components/Context/ShopContext";
import Item from "../Components/Item/Item";
import "./css/SearchResults.css";

const SearchResults = () => {
    const { searchResults } = useContext(ShopContext);

    return (
        <div className="search-results">
            <h1>Search Results</h1>
            {searchResults.length > 0 ? (
                <div className="search-results-grid">
                    {searchResults.map((product, i) => (
                        <Item key={i} id={product.id} name={product.name} image={product.image} new_price={product.new_price} old_price={product.old_price} />
                    ))}
                </div>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default SearchResults;