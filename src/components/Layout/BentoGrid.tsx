import React from 'react';
import './BentoGrid.css';

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
    return (
        <div className={`bento-container ${className}`}>
            <div className="bento-grid">
                {children}
            </div>
        </div>
    );
};

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    style?: React.CSSProperties;
}

export const BentoCard: React.FC<BentoCardProps> = ({ children, className = '', delay = 0, style = {} }) => {
    return (
        <div
            className={`bento-box animate-fade-up ${className}`}
            style={{ animationDelay: `${delay}ms`, ...style }}
        >
            {children}
        </div>
    );
};
