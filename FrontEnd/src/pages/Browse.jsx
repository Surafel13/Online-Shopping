import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { fetchProducts } from '../utils/api';
import { normalizeProduct } from '../utils/productMapper';
import './Browse.css';

const Browse = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category') || 'all';
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError('');
        fetchProducts()
            .then(data => {
                if (!isMounted) return;
                const normalized = data.map(normalizeProduct);
                setAllProducts(normalized);
            })
            .catch(err => {
                if (!isMounted) return;
                setError(err.message || 'Failed to load products.');
            })
            .finally(() => {
                if (!isMounted) return;
                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (categoryFilter === 'all') {
            setFilteredProducts(allProducts);
        } else {
            setFilteredProducts(allProducts.filter(p => p.category === categoryFilter));
        }
    }, [categoryFilter, allProducts]);

    const setCategory = (cat) => {
        if (cat === 'all') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', cat);
        }
        setSearchParams(searchParams);
    };

    return (
        <div className="browse-page container section-padding">
            <header className="page-header">
                <h1>Discover our Collections</h1>
                <p>Premium quality fabrics and timeless designs</p>
            </header>

            <div className="filters-bar flex items-center justify-between">
                <div className="tabs flex gap-2">
                    {['all', 'men', 'women', 'kids', 'electronics'].map(cat => (
                        <button
                            key={cat}
                            className={`tab-btn ${categoryFilter === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="results-count">
                    Showing {filteredProducts.length} items
                </div>
            </div>

            {loading && (
                <div className="results-count">Loading products...</div>
            )}

            {error && (
                <div className="results-count">{error}</div>
            )}

            {!loading && !error && (
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Browse;
