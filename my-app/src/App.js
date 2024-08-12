import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignUp from './Pages/LoginSignUp';
import Cart from './Pages/Cart';
import Info from './Components/Info/Info';
import SearchResults from './Pages/Search.jsx'; // Import SearchResults component
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import ShopContextProvider from './Components/Context/ShopContext';

function App() {
    return (
        <div>
            <BrowserRouter>
                <ShopContextProvider>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Shop />} />
                        <Route path='/search-results' element={<SearchResults />} /> {/* Add search-results route */}
                        <Route path='/men' element={<ShopCategory banner={men_banner} category="men" />} />
                        <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />} />
                        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
                        <Route path='/product/:productId' element={<Product />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/login' element={<LoginSignUp />} />
                    </Routes>
                    <Info />
                </ShopContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
