import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        country: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Order placed successfully! (Demo only)");
        // Here you would clear cart and navigate
    };

    if (cartItems.length === 0) {
        return (
            <div className="container section-padding empty-cart">
                <h2>Your Bag is Empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="/" className="shop-now-btn">Shop Now</a>
            </div>
        );
    }

    return (
        <div className="checkout-page container section-padding">
            <h1 className="page-title">Checkout</h1>

            <div className="checkout-grid">
                <div className="cart-summary">
                    <h3>Your Bag ({cartItems.length})</h3>
                    <div className="cart-items">
                        {cartItems.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="cart-item">
                                <div className="item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="item-details">
                                    <div className="item-header flex justify-between">
                                        <h4>{item.name}</h4>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <p className="item-meta">{item.selectedColor} | {item.selectedSize}</p>
                                    <div className="item-footer flex justify-between items-center">
                                        <div className="quantity-controls flex items-center gap-2">
                                            <button onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, -1)}><Minus size={14} /></button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, 1)}><Plus size={14} /></button>
                                        </div>
                                        <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="order-totals">
                        <div className="total-row flex justify-between">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="total-row flex justify-between">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>
                        <div className="total-row flex justify-between grand-total">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="checkout-form-container">
                    <h3>Contact Information</h3>
                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Shipping Address</label>
                            <input
                                type="text"
                                name="address"
                                required
                                placeholder="123 Street Name"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-row flex gap-2">
                            <div className="form-group flex-1">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    placeholder="New York"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group flex-1">
                                <label>Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    required
                                    placeholder="United States"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="payment-notice">
                            <CreditCard size={18} />
                            <span>Payments are currently disabled for this demo.</span>
                        </div>

                        <button type="submit" className="place-order-btn">
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
