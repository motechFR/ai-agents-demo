import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "AI in Cybersecurity - Vertical AI - AI in Production" },
    { name: "description", content: "AI-powered cybersecurity solutions and threat detection" },
  ];
};

export default function ProductionVerticalAICybersecurity() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <nav style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1rem" }}>
            <span>AI in Production</span> / <span>Vertical AI</span> / <span style={{ color: "#111827" }}>AI in Cybersecurity</span>
          </nav>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            AI in Cybersecurity
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "2rem" }}>
            AI-powered cybersecurity solutions for threat detection, incident response, and security automation
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
            This section will cover AI applications in cybersecurity including threat detection, 
            anomaly detection, automated incident response, and security orchestration platforms.
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
              Threat Detection
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              AI-powered threat identification and analysis
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Anomaly Detection
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Machine learning for unusual behavior detection
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Incident Response
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Automated response and remediation systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 