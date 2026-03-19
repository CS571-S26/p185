import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';

import {auth} from './firebase';
import NavigationBar from './components/Navbar.jsx';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import './App.css'
import {Container} from "react-bootstrap";


function App() {
    const [user, setUser] = useState(null);
    // const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // const handleCartShow=() => setShowCart(true);
    // const handleCartClose=() => setShowCart(false);

    return (
        <Router>
            <NavigationBar user={user} />

            <Container className={"mt-4"}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/checkout" element={<Checkout user={user}/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Container>
            <aside className={"miniCartSidebar"}>
                {
                    // ToDo: <CartSidebar show={showCart} handleClose={handleCartClose}/>
                }
            </aside>
        </Router>
    );
}

export default App;
