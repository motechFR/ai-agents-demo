import { useState, useRef } from 'react';

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

export type ChatHistoryProps = {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  suggestedMessages?: string[];
};

export function ChatHistory({ messages = [], onSendMessage, suggestedMessages = [] }: ChatHistoryProps) {
  const [newMessage, setNewMessage] = useState('');
  const suggestedMessagesRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!suggestedMessagesRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - suggestedMessagesRef.current.offsetLeft);
    setScrollLeft(suggestedMessagesRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !suggestedMessagesRef.current) return;
    e.preventDefault();
    const x = e.pageX - suggestedMessagesRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    suggestedMessagesRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <p className="empty-chat">No messages yet. Start a conversation!</p>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'assistant' ? 'ai-message' : 'human-message'}`}
            >
              <div className="message-content">{message.content}</div>
              <div className="message-timestamp">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
      {suggestedMessages.length > 0 && (
        <div 
          ref={suggestedMessagesRef}
          className="suggested-messages"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {suggestedMessages.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-bubble"
              onClick={(e) => {
                if (isDragging) {
                  e.preventDefault();
                  return;
                }
                onSendMessage?.(suggestion);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          className="chat-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
} 