import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Observability - Tooling - AI in Production" },
    { name: "description", content: "Monitoring, logging, and performance tracking for AI systems" },
  ];
};

export default function ProductionToolingObservability() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <nav style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1rem" }}>
            <span>AI in Production</span> / <span>Tooling</span> / <span style={{ color: "#111827" }}>Observability</span>
          </nav>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Observability
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "2rem" }}>
            Monitoring, logging, and performance tracking for production AI systems
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
            This section will cover comprehensive observability strategies for AI systems, including 
            metrics collection, alerting, debugging, and performance optimization.
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
              Metrics & KPIs
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Key performance indicators for AI systems
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Distributed Tracing
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              End-to-end request tracking and debugging
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Alerting Systems
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Automated monitoring and incident response
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 