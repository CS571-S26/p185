import React, {useState, useEffect} from 'react';
import {HashRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';

import {auth} from './firebase';
import NavigationBar from './components/Navbar.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import './App.css'
import {Container} from "react-bootstrap";
import {CartProvider} from "./contexts/CartContext.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import Order from "./pages/Order.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";


function App() {
    const [user, setUser] = useState(null);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleCartShow=() => setShowCart(true);
    const handleCartClose=() => setShowCart(false);

    return (
        <CartProvider>
            <Router>
                <NavigationBar user={user} handleCartShow={handleCartShow}/>
                <Container fluid className={""}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/products" element={<Products handleCartShow={handleCartShow}/>}/>
                        <Route path="/order" element={<Order user={user}/>} />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/order-history" element={<OrderHistory user={user} />} />
                    </Routes>
                </Container>
                <aside className={"miniCartSidebar"}>
                    {
                        <CartSidebar show={showCart} handleClose={handleCartClose} user={user}/>
                    }
                </aside>
            </Router>
        </CartProvider>
    );
}

export default App;
