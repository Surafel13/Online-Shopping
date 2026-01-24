import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // Mock login - if email is admin@store.com, set as admin
        const isAdmin = email === 'admin@store.com';
        setUser({ email, role: isAdmin ? 'admin' : 'user', name: email.split('@')[0] });
        return true;
    };

    const register = (name, email, password) => {
        setUser({ name, email, role: 'user' });
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
};
