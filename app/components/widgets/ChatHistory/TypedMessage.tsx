import { useEffect, useState } from 'react';

export const formatMessage = (content: string) => {

    // Split by newlines and wrap each line in a div
    const lines = content?.split('\n');
    return lines?.map((line, index) => {
      // Replace **text** with <strong>text</strong>
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
  };
  

export function TypedMessage({ content, onComplete }: { content: string, onComplete?: () => void; }) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  // Dynamic typing speed - faster for longer messages
  const getTypingSpeed = () => {
    // Base speed in milliseconds
    const baseSpeed = 5;
    
    // For longer content, make it faster
    if (content.length > 200) return baseSpeed / 2;
    if (content.length > 100) return baseSpeed / 1.5;
    
    // For very short messages, ensure they don't appear too quickly
    if (content.length < 20) return baseSpeed * 1.2;
    
    return baseSpeed;
  };
  
  // Skip to the end of the typing animation when clicked
  const handleClick = () => {
    setDisplayedContent(content);
    setCurrentIndex(content.length);
    setIsTypingComplete(true);
    if (onComplete) {
      onComplete();
    }
  };
  
  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedContent(content.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, getTypingSpeed());
      
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [content, currentIndex, onComplete]);
  
  return (
    <div 
      className={`message-content ${isTypingComplete ? 'typing-complete' : ''}`}
      onClick={handleClick}
      style={{ cursor: isTypingComplete ? 'default' : 'pointer' }}
      title={isTypingComplete ? '' : 'Click to show full message'}
    >
      {formatMessage(displayedContent)}
    </div>
  );
};
