import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const productId = product.id || product._id;
    const imageSrc = product.image || product.imageUrl;

    return (
        <motion.div
            className="product-card"
            whileHover={{ y: -10 }}
            layout
        >
            <div className="product-image">
                <img src={imageSrc} alt={product.name} />
                <div className="product-overlay">
                    <Link to={`/product/${productId}`} className="overlay-btn">
                        <Eye size={18} /> Quick View
                    </Link>
                </div>
                <div className="product-badge">{product.category}</div>
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
