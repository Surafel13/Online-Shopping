import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        register(formData.name, formData.email, formData.password);
        navigate('/');
    };

    return (
        <div className="auth-page">
            <div className="auth-wrapper">
                <div className="auth-image-side" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800')" }}>
                    <div className="auth-image-overlay"></div>
                    <div className="auth-image-content">
                        <h2>Join GLAMCO</h2>
                        <p className="text-lg">Discover exclusive styles and premium fashion.</p>
                    </div>
                </div>

                <div className="auth-form-side">
                    <div className="auth-header">
                        <h1>Create Account</h1>
                        <p>Enter your personal details to begin</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group icon-input">
                            <User className="input-icon" size={18} />
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group icon-input">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group icon-input">
                            <Lock className="input-icon" size={18} />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        <div className="form-group icon-input">
                            <Lock className="input-icon" size={18} />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="auth-submit-btn flex items-center justify-center gap-2">
                            Sign Up <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
