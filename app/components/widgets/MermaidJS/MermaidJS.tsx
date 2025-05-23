import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import './MermaidJS.css';

type MermaidJSProps = {
  content: string;
  maxWidth?: string | number;
  maxHeight?: string | number;
}

export function MermaidJS({ content, maxWidth, maxHeight }: MermaidJSProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);



  
  useEffect(() => {
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = '';
      
      // Initialize mermaid
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose'
      });
      
      // Generate a unique ID for this diagram
      const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;
      
      try {

        // Trim content and remove mermaid tags if present
        let trimmedContent = content.trim();
        if (trimmedContent.startsWith('```mermaid')) {
            trimmedContent = trimmedContent.substring('```mermaid'.length);
        }
        if (trimmedContent.endsWith('```')) {
            trimmedContent = trimmedContent.substring(0, trimmedContent.length - 3);
        }
        trimmedContent = trimmedContent.trim();

        // Render the diagram
        mermaid.render(id, trimmedContent).then(({ svg }) => {
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;
          }
        });
      } catch (error) {
        console.error('Failed to render mermaid diagram:', error);
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = `<div style="color: red;">Error rendering diagram</div>`;
        }
      }
    }
  }, [content]);

  if (!content) {
    return null;
  }

  return (
    <div 
      className="mermaid-container"
      style={{
        '--max-width': maxWidth,
        '--max-height': maxHeight
      } as React.CSSProperties}
    >
      <div ref={mermaidRef} className="mermaid-diagram"></div>
    </div>
  );
} 