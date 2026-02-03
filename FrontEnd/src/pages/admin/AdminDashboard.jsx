import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../../utils/api';
import { normalizeProduct } from '../../utils/productMapper';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'men',
        imageUrl: '',
        description: '',
        quantity: 1
    });

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError('');
        fetchProducts()
            .then(data => {
                if (!isMounted) return;
                setProducts(data.map(normalizeProduct));
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

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name || '',
                price: product.price || '',
                category: product.category || 'men',
                imageUrl: product.imageUrl || product.image || '',
                description: product.description || '',
                quantity: product.quantity || 1
            });
        } else {
            setEditingProduct(null);
            setFormData({ name: '', price: '', category: 'men', imageUrl: '', description: '', quantity: 1 });
        }
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                alert(err.message || 'Failed to delete product.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            quantity: parseInt(formData.quantity, 10),
            imageUrl: formData.imageUrl
        };

        try {
            if (editingProduct) {
                const response = await updateProduct(editingProduct.id, payload);
                const updated = normalizeProduct(response.product || payload);
                setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...updated } : p));
            } else {
                const response = await createProduct(payload);
                const created = normalizeProduct(response.product || payload);
                setProducts([created, ...products]);
            }
            setShowModal(false);
        } catch (err) {
            alert(err.message || 'Failed to save product.');
        }
    };

    return (
        <div className="admin-dashboard container section-padding">
            <div className="admin-header flex justify-between items-center">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Manage your product catalog</p>
                </div>
                <button className="add-btn flex items-center gap-2" onClick={() => handleOpenModal()}>
                    <Plus size={18} /> Add New Product
                </button>
            </div>

            <div className="admin-table-container">
                {loading && <p className="info-short">Loading products...</p>}
                {error && <p className="info-short">{error}</p>}
                {!loading && !error && (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.image || product.imageUrl} alt={product.name} className="table-img" />
                                    </td>
                                    <td>
                                        <div className="product-name-cell">
                                            <strong>{product.name}</strong>
                                            <span className="info-short">{product.description?.substring(0, 40)}...</span>
                                        </div>
                                    </td>
                                    <td><span className="badge">{product.category}</span></td>
                                    <td><strong>${product.price}</strong></td>
                                    <td>
                                        <div className="actions flex gap-2">
                                            <button className="edit-btn" onClick={() => handleOpenModal(product)}><Edit2 size={16} /></button>
                                            <button className="delete-btn" onClick={() => handleDelete(product.id)}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header flex justify-between items-center">
                            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                            <button onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        <form className="admin-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-row flex gap-2">
                                <div className="form-group flex-1">
                                    <label>Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group flex-1">
                                    <label>Quantity</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group flex-1">
                                    <label>Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="kids">Kids</option>
                                        <option value="electronics">Electronics</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <input
                                    type="text"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn">
                                {editingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
