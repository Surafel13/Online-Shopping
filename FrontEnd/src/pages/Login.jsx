import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        navigate('/');
    };

    return (
        <div className="auth-page">
            <div className="auth-wrapper">
                <div className="auth-image-side">
                    <div className="auth-image-overlay"></div>
                    <div className="auth-image-content">
                        <h2>Welcome Back</h2>
                        <p className="text-lg">Access your account to manage orders and explore new collections.</p>
                    </div>
                </div>

                <div className="auth-form-side">
                    <div className="auth-header">
                        <h1>Sign In</h1>
                        <p>Please enter your details to continue</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group icon-input">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group icon-input">
                            <Lock className="input-icon" size={18} />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="auth-submit-btn flex items-center justify-center gap-2">
                            Sign In <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/register">Create Account</Link></p>
                        <p className="admin-hint">Tip: Use <strong>admin@store.com</strong> to access Admin Panel</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
