import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-info">
                        <h3 className="logo">GLAM<span>CO</span></h3>
                        <p>Elevating your style with curated premium clothing for every occasion.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Shop</h4>
                        <ul>
                            <li><a href="/">Men's Collection</a></li>
                            <li><a href="/">Women's Collection</a></li>
                            <li><a href="/">New Arrivals</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="/">About Us</a></li>
                            <li><a href="/">Contact</a></li>
                            <li><a href="/">Shipping Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 GLAMCO. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
