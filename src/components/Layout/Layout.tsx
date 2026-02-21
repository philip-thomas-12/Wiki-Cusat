import React from 'react';
import { Navbar } from './Navbar';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="app-container">
            <Navbar />
            <div className="main-content-area bento-container">
                {children}
            </div>
        </div>
    );
};
