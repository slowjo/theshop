import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }) {
    return (
        <div className="layout">
        <Navbar />
            {children}
        <Footer />
        </div>
    );
};