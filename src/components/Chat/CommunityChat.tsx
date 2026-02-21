import React from 'react';
import { Send, Hash } from 'lucide-react';
import './CommunityChat.css';

export const CommunityChat: React.FC = () => {
    return (
        <div className="chat-container glass-panel">
            <div className="chat-header">
                <div className="chat-title">
                    <Hash size={18} className="text-primary" />
                    <span>General Campus Chat</span>
                </div>
                <div className="chat-participants">1,204 online</div>
            </div>

            <div className="chat-messages">
                <div className="message received">
                    <div className="msg-avatar">A</div>
                    <div className="msg-content">
                        <div className="msg-author">Alumni (Class of '22)</div>
                        <div className="msg-bubble">Does anyone know the timing for the weekend library access?</div>
                    </div>
                </div>

                <div className="message received">
                    <div className="msg-avatar" style={{ background: 'var(--color-accent)' }}>S</div>
                    <div className="msg-content">
                        <div className="msg-author">Student - CS</div>
                        <div className="msg-bubble">It's open from 9 AM to 5 PM on Saturdays, closed Sundays!</div>
                    </div>
                </div>
            </div>

            <div className="chat-input-area">
                <input
                    type="text"
                    placeholder="Ask a question or share something anonymously..."
                    className="chat-input"
                />
                <button className="btn btn-primary send-btn">
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};
