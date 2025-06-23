import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Tooling - AI in Production" },
    { name: "description", content: "AI tooling and infrastructure for production environments" },
  ];
};

export default function ProductionTooling() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Tooling
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "2rem" }}>
          AI tooling and infrastructure for production environments
        </p>
        
        <div style={{ 
          backgroundColor: "#f9fafb", 
          border: "1px solid #e5e7eb", 
          borderRadius: "8px", 
          padding: "2rem",
          marginBottom: "2rem"
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
            Overview
          </h2>
          <p>
            This section covers the essential tooling required for deploying and managing AI systems in production environments.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Models
            </h3>
            <p style={{ color: "#6b7280" }}>
              Model management, versioning, and deployment strategies
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Observability
            </h3>
            <p style={{ color: "#6b7280" }}>
              Monitoring, logging, and performance tracking for AI systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 