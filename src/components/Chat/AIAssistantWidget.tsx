import React, { useState } from 'react';
import { Bot, X, MessageSquare } from 'lucide-react';
import './AIAssistantWidget.css';

export const AIAssistantWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!isOpen && (
                <button
                    className="ai-widget-toggle btn-primary"
                    onClick={() => setIsOpen(true)}
                >
                    <Bot size={24} />
                    <span className="tooltip">Ask AI Assistant</span>
                </button>
            )}

            {isOpen && (
                <div className="ai-widget-panel glass-panel">
                    <div className="ai-widget-header">
                        <div className="ai-title">
                            <div className="ai-icon-bg"><Bot size={18} /></div>
                            <span>Wiki CUSAT AI</span>
                        </div>
                        <button className="btn btn-ghost icon-btn" onClick={() => setIsOpen(false)}>
                            <X size={18} />
                        </button>
                    </div>

                    <div className="ai-widget-body">
                        <div className="ai-message greeting">
                            Hello! 👋 I'm your interactive CUSAT campus assistant. How can I help you navigate the platform or find information today?
                        </div>

                        <div className="ai-suggestions">
                            <button className="suggestion-chip">Where is the placement cell?</button>
                            <button className="suggestion-chip">Find CS department faculty</button>
                            <button className="suggestion-chip">What events are happening?</button>
                        </div>
                    </div>

                    <div className="ai-widget-footer">
                        <div className="ai-input-wrapper">
                            <input type="text" placeholder="Type your question..." />
                            <button className="send-btn text-primary">
                                <MessageSquare size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
