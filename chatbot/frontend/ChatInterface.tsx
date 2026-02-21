import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import './ChatInterface.css';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'bot',
            text: "Hello! 👋 I'm your Ultimate CUSAT assistant. I have studied the 2026 Prospectus. How can I help you today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;
        
        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
            });
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            const botMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: data.reply };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Error communicating with AI:", error);
            setMessages(prev => [...prev, { 
                id: (Date.now() + 1).toString(), 
                sender: 'bot', 
                text: "Sorry, I am having trouble connecting to my brain right now. Make sure the backend server is running." 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const formatText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="chat-title">
                    <Bot size={24} className="bot-icon" />
                    <h2>CUSAT Navigator AI</h2>
                </div>
            </div>

            <div className="chat-body">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
                        <div className={`avatar ${msg.sender}`}>
                            {msg.sender === 'bot' ? <Bot size={18} /> : <User size={18} />}
                        </div>
                        <div className={`message-bubble ${msg.sender}`}>
                            {formatText(msg.text)}
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="message-row bot-row">
                        <div className="avatar bot">
                            <Bot size={18} />
                        </div>
                        <div className="message-bubble bot loading">
                            <Loader2 size={16} className="spinner" /> Thinking...
                        </div>
                    </div>
                )}

                {messages.length === 1 && (
                    <div className="suggestions-container">
                        <button className="suggestion-btn" onClick={() => handleSend("What are the eligibility criteria for B.Tech CSE?")}>
                            Eligibility for B.Tech CSE
                        </button>
                        <button className="suggestion-btn" onClick={() => handleSend("How can I apply for hostels?")}>
                            Hostel Applications
                        </button>
                        <button className="suggestion-btn" onClick={() => handleSend("I need help finding a project partner")}>
                            Find project partner
                        </button>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-footer">
                <div className="input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Ask me anything about CUSAT..." 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                        disabled={isLoading}
                    />
                    <button 
                        onClick={() => handleSend(input)}
                        disabled={!input.trim() || isLoading}
                        className={`send-btn ${input.trim() && !isLoading ? 'active' : ''}`}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
