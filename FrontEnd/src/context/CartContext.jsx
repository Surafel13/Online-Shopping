import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, selections) => {
        setCartItems(prev => {
            const existing = prev.find(item =>
                item.id === product.id &&
                item.selectedColor === selections.color &&
                item.selectedSize === selections.size
            );

            if (existing) {
                return prev.map(item =>
                    item === existing ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prev, { ...product, ...selections, quantity: 1 }];
        });
    };

    const removeFromCart = (id, color, size) => {
        setCartItems(prev => prev.filter(item =>
            !(item.id === id && item.selectedColor === color && item.selectedSize === size)
        ));
    };

    const updateQuantity = (id, color, size, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id && item.selectedColor === color && item.selectedSize === size) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
