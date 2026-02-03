import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ChevronLeft, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchProductById } from '../utils/api';
import { normalizeProduct } from '../utils/productMapper';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError('');
        fetchProductById(id)
            .then(data => {
                if (!isMounted) return;
                const normalized = normalizeProduct(data);
                setProduct(normalized);
                setSelectedSize(normalized.sizes[0] || 'Default');
                setSelectedColor(normalized.colors[0] || 'Default');
            })
            .catch(err => {
                if (!isMounted) return;
                setError(err.message || 'Product not found');
            })
            .finally(() => {
                if (!isMounted) return;
                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) return <div className="container section-padding">Loading product...</div>;
    if (error) return <div className="container section-padding">{error}</div>;
    if (!product) return <div className="container section-padding">Product not found</div>;

    const handleAddToCart = () => {
        addToCart(product, { size: selectedSize, color: selectedColor });
        // Show some feedback or navigate
        alert('Added to cart!');
    };

    return (
        <div className="product-detail-page container section-padding">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ChevronLeft size={20} /> Back to Browse
            </button>

            <div className="detail-grid">
                <motion.div
                    className="image-section"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <img src={product.image || product.imageUrl} alt={product.name} className="main-image" />
                </motion.div>

                <motion.div
                    className="info-section"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="category-tag">{product.category}</div>
                    <h1 className="product-title">{product.name}</h1>
                    <div className="rating flex items-center gap-1">
                        <div className="stars flex">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <span>(4.8 - 120 reviews)</span>
                    </div>
                    <p className="price">${product.price.toFixed(2)}</p>
                    <p className="description">{product.description}</p>

                    <div className="selections">
                        <div className="selection-group">
                            <label>Select Color</label>
                            <div className="options flex gap-2">
                                {product.colors.map(color => (
                                    <button
                                        key={color}
                                        className={`option-btn ${selectedColor === color ? 'active' : ''}`}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="selection-group">
                            <label>Select Size</label>
                            <div className="options flex gap-2">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`option-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        <ShoppingBag size={20} /> Add to Cart
                    </button>

                    <div className="extra-info">
                        <p><strong>Shipping:</strong> Free worldwide shipping on orders over $150</p>
                        <p><strong>Returns:</strong> 30-day easy returns</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
