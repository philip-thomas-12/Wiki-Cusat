import React from 'react';
import { Map, Users, MessageSquare, BookOpen, Briefcase, Building, Server } from 'lucide-react';
import './Sidebar.css';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => (
    <button className={`nav-item ${active ? 'active' : ''}`}>
        <span className="nav-icon">{icon}</span>
        <span className="nav-label">{label}</span>
    </button>
);

export const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar glass-panel">
            <nav className="sidebar-nav">
                <div className="nav-section">
                    <h3 className="section-title">Explore</h3>
                    <NavItem icon={<Map size={20} />} label="Campus Map" active={true} />
                    <NavItem icon={<BookOpen size={20} />} label="Departments" />
                </div>

                <div className="nav-section">
                    <h3 className="section-title">Community</h3>
                    <NavItem icon={<Users size={20} />} label="Students & Alumni" />
                    <NavItem icon={<Briefcase size={20} />} label="Placements" />
                </div>

                <div className="nav-section">
                    <h3 className="section-title">Resources</h3>
                    <NavItem icon={<Building size={20} />} label="Facilities" />
                    <NavItem icon={<MessageSquare size={20} />} label="Campus Space" />
                    <NavItem icon={<Server size={20} />} label="Projects" />
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="ai-assistant-btn">
                    ✨ Ask AI Assistant
                </div>
            </div>
        </aside>
    );
};
