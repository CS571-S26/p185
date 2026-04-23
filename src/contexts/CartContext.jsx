import {createContext, useContext, useState} from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const isExist = prev.find(item => item.id === product.id);
            if (isExist) {
                return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
            }
            return [...prev, {...product, quantity: 1}];
        });
    };

    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return {...item, quantity: newQty};
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    const calculateTotal = () => {
        let subtotal = 0;
        let savings = 0;

        cartItems.forEach(item => {
            const itemPrice = item.price || 0;
            subtotal += itemPrice * item.quantity;
            if (item.promotions === "2+1 Deal") {
                const freeItems = Math.floor(item.quantity / 3);
                savings += freeItems * itemPrice;
            }
        });

        const total = subtotal - savings;
        const isFreeShipping = total >= 35;
        const shippingFee = (total > 0 && !isFreeShipping) ? 5.00 : 0;

        return {
            subtotal: subtotal.toFixed(2),
            savings: savings.toFixed(2),
            shippingFee: shippingFee.toFixed(2),
            total: (total + shippingFee).toFixed(2),
            isFreeShipping
        };
    };

    const clearCart = () => {
        setCartItems([]);
    };


    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (<CartContext value={{
        cartItems, addToCart, updateQuantity, removeFromCart, calculateTotal, clearCart, totalCount
    }}>
        {children}
    </CartContext>);
};

export const useCart = () => useContext(CartContext);