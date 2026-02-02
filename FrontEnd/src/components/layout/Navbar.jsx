import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { cartItems } = useCart();
    const { user, logout, isAdmin } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="container navbar-container flex justify-between items-center">
                <Link to="/" className="logo">
                    GLAM<span>CO</span>
                </Link>

                <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                    <Link to="/" onClick={closeMobileMenu} className="nav-link">Home</Link>
                    <Link to="/?category=men" onClick={closeMobileMenu} className="nav-link">Men</Link>
                    <Link to="/?category=women" onClick={closeMobileMenu} className="nav-link">Women</Link>
                    <Link to="/?category=kids" onClick={closeMobileMenu} className="nav-link">Kids</Link>
                    <Link to="/?category=electronics" onClick={closeMobileMenu} className="nav-link">Electronics</Link>
                </div>

                <div className="nav-actions flex items-center gap-4">
                    <button
                        type="button"
                        className="icon-btn nav-toggle"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(v => !v)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    {isAdmin && (
                        <Link title="Admin Dashboard" to="/admin" className="icon-btn">
                            <LayoutDashboard size={20} />
                        </Link>
                    )}

                    <Link to="/checkout" title="Cart" className="icon-btn cart-btn">
                        <ShoppingBag size={20} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>

                    {user ? (
                        <div className="user-menu flex items-center gap-2">
                            <span className="user-name">Hi, {user.name}</span>
                            <button onClick={logout} title="Logout" className="icon-btn">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" title="Login" className="icon-btn">
                            <User size={20} />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
