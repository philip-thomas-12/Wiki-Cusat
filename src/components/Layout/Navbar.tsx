import React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = () => {
    return (
        <header className="navbar glass-panel">
            <div className="navbar-left">
                <button className="btn btn-ghost icon-btn">
                    <Menu size={24} />
                </button>
                <div className="brand">
                    <span className="brand-text">Wiki <span className="text-primary">CUSAT</span></span>
                </div>
            </div>

            <div className="navbar-center">
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search campus, people, facilities..." />
                </div>
            </div>

            <div className="navbar-right">
                <button className="btn btn-ghost icon-btn relative">
                    <Bell size={20} />
                    <span className="notification-badge"></span>
                </button>
                <div className="user-profile">
                    <div className="avatar">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};
