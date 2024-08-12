import React, { useContext, useState, useEffect } from "react";
import './css/ShopCategory.css';
import { ShopContext } from "../Components/Context/ShopContext";
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [sortOrder, setSortOrder] = useState('default');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showRangeInputs, setShowRangeInputs] = useState(false);

    useEffect(() => {
        let updatedProducts = all_product.filter(item => item.category === props.category);

        if (sortOrder === 'price-asc') {
            updatedProducts.sort((a, b) => a.new_price - b.new_price);
        } else if (sortOrder === 'price-desc') {
            updatedProducts.sort((a, b) => b.new_price - a.new_price);
        }

        setFilteredProducts(updatedProducts);
    }, [all_product, sortOrder, props.category]);

    const handleSortChange = (event) => {
        const value = event.target.value;
        setSortOrder(value);

        if (value === 'price-range') {
            setShowRangeInputs(true);
        } else {
            setShowRangeInputs(false);
        }
    };

    const handleApplyPriceRange = () => {
        let updatedProducts = all_product.filter(item => item.category === props.category);
        
        if (minPrice !== '' && maxPrice !== '') {
            updatedProducts = updatedProducts.filter(item =>
                item.new_price >= Number(minPrice) && item.new_price <= Number(maxPrice)
            );
        }

        if (sortOrder === 'price-asc') {
            updatedProducts.sort((a, b) => a.new_price - b.new_price);
        } else if (sortOrder === 'price-desc') {
            updatedProducts.sort((a, b) => b.new_price - a.new_price);
        }

        setFilteredProducts(updatedProducts);
        setShowRangeInputs(false); // Hide the price range inputs after applying
    };

    return (
        <div className="shop-category">
            <img className="shopcategory-banner" src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-{filteredProducts.length}</span> out of {filteredProducts.length} Products
                </p>
                <div className="shopcategory-sort">
                    Sort by
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="price-range">Price Range</option>
                    </select>
                </div>
                {showRangeInputs && (
                    <div className="price-range-filter">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <button onClick={handleApplyPriceRange}>Apply</button>
                    </div>
                )}
            </div>
            <div className="shotcategory-products">
                {filteredProducts.map((item, i) => (
                    <div className="product-item" key={i}>
                        <Item
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                        />
                    </div>
                ))}
            </div>
            <div className="shopcategory-loadmore">
                Load More
            </div>
        </div>
    );
}

export default ShopCategory;
