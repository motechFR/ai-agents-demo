import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Workflow Orchestration - Horizontal Tools - AI in Production" },
    { name: "description", content: "Workflow orchestration via n8n and automation platforms" },
  ];
};

export default function ProductionHorizontalToolsWorkflowOrchestration() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <nav style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1rem" }}>
            <span>AI in Production</span> / <span>Horizontal Tools</span> / <span style={{ color: "#111827" }}>Workflow Orchestration</span>
          </nav>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Workflow Orchestration via n8n
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "2rem" }}>
            Automated workflow management and business process optimization using n8n and similar platforms
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: "#f9fafb", 
          border: "1px solid #e5e7eb", 
          borderRadius: "8px", 
          padding: "2rem",
          marginBottom: "2rem"
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
            Coming Soon
          </h2>
          <p>
            This section will cover workflow automation platforms like n8n, integration patterns, 
            AI-powered automation, and enterprise workflow orchestration strategies.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              n8n Platform
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Visual workflow automation and integration
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              AI Integration
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Embedding AI capabilities in workflows
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Error Handling
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Robust error handling and retry mechanisms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 