import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../utils/dummyData';
import ProductCard from '../components/common/ProductCard';
import { Filter } from 'lucide-react';
import './Browse.css';

const Browse = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category') || 'all';
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        if (categoryFilter === 'all') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === categoryFilter));
        }
    }, [categoryFilter]);

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

            <div className="products-grid">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Browse;
