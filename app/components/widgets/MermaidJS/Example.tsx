import { MermaidJS } from './MermaidJS';

export default function MermaidExample() {
  // Example flowchart
  const flowchart = `
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
  `;

  return (
    <div>
      <h2>Mermaid Flowchart Example</h2>
      <MermaidJS 
        content={flowchart} 
        maxWidth="100%" 
        maxHeight="400px" 
      />
    </div>
  );
} 