import { useState, useRef, useEffect } from 'react';
import './ChatHistory.css';
import { formatMessage } from './TypedMessage';
import { TypedMessage } from './TypedMessage';

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

const ThinkingIndicator = () => (
  <div className="thinking-indicator">
    <div className="thinking-bubble"></div>
    <div className="thinking-bubble"></div>
    <div className="thinking-bubble"></div>
  </div>
);



export function ChatHistory({ messages = [], onSendMessage, suggestedMessages = [] }: ChatHistoryProps) {
  const [newMessage, setNewMessage] = useState('');
  const suggestedMessagesRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const previousMessagesRef = useRef<Message[]>([]);
  
  const isAiThinking = messages.length > 0 && messages[messages.length - 1].sender === 'user';

  // Track new messages by comparing current messages with previous ones
  useEffect(() => {
    // Check if a new message has been added
    if (messages.length > previousMessagesRef.current.length) {
      const lastMessage = messages[messages.length - 1];
      
      // Only set typing effect for new assistant messages
      if (lastMessage.sender === 'assistant') {
        setTypingMessageId(lastMessage.id);
      }
    }
    
    // Update the reference to current messages
    previousMessagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, typingMessageId, isAiThinking]);

  // Message handling logic
  const messageHandlers = {
    updateMessage: (e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value),
    
    sendMessage: (message: string = newMessage) => {
      if (message.trim() && onSendMessage) {
        onSendMessage(message);
        setNewMessage('');
      }
    },
    
    handleSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      messageHandlers.sendMessage();
    },
    
    sendSuggestion: (suggestion: string, e: React.MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        return;
      }
      messageHandlers.sendMessage(suggestion);
    }
  };

  // Suggested messages dragging logic
  const dragHandlers = {
    handleMouseDown: (e: React.MouseEvent) => {
      if (!suggestedMessagesRef.current) return;
      setIsDragging(true);
      setStartX(e.pageX - suggestedMessagesRef.current.offsetLeft);
      setScrollLeft(suggestedMessagesRef.current.scrollLeft);
    },

    handleMouseMove: (e: React.MouseEvent) => {
      if (!isDragging || !suggestedMessagesRef.current) return;
      e.preventDefault();
      const x = e.pageX - suggestedMessagesRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      suggestedMessagesRef.current.scrollLeft = scrollLeft - walk;
    },

    handleMouseUp: () => setIsDragging(false),
    handleMouseLeave: () => setIsDragging(false)
  };

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={messagesContainerRef}>
        {messages.length === 0 ? (
          <p className="empty-chat">No messages yet. Start a conversation!</p>
        ) : (
          <>
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'assistant' ? 'ai-message' : 'human-message'}`}
              >
                <div className="message-content">
                  {message.sender === 'assistant' && typingMessageId === message.id ? (
                    <TypedMessage 
                      content={message.content} 
                      onComplete={() => setTypingMessageId(null)} 
                    />
                  ) : (
                    formatMessage(message.content)
                  )}
                </div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
            {isAiThinking && (
              <div className="message ai-message">
                <ThinkingIndicator />
              </div>
            )}
          </>
        )}
      </div>
      {suggestedMessages.length > 0 && (
        <div 
          ref={suggestedMessagesRef}
          className={`suggested-messages ${isAiThinking ? 'disabled' : ''}`}
          onMouseDown={!isAiThinking ? dragHandlers.handleMouseDown : undefined}
          onMouseMove={!isAiThinking ? dragHandlers.handleMouseMove : undefined}
          onMouseUp={!isAiThinking ? dragHandlers.handleMouseUp : undefined}
          onMouseLeave={!isAiThinking ? dragHandlers.handleMouseLeave : undefined}
        >
          {suggestedMessages.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-bubble"
              onClick={(e) => messageHandlers.sendSuggestion(suggestion, e)}
              disabled={isAiThinking}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      <form onSubmit={messageHandlers.handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={newMessage}
          onChange={messageHandlers.updateMessage}
          placeholder={isAiThinking ? "AI is thinking..." : "Type your message here..."}
          className="chat-input"
          disabled={isAiThinking}
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={isAiThinking}
        >
          Send
        </button>
      </form>
    </div>
  );
} 