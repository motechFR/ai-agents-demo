import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Vertical AI - AI in Production" },
    { name: "description", content: "Industry-specific AI applications and specialized solutions" },
  ];
};

export default function ProductionVerticalAI() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Vertical AI
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "2rem" }}>
          Industry-specific AI applications and specialized solutions tailored for particular domains
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
            Vertical AI solutions are designed to address specific industry challenges and requirements, 
            offering deep domain expertise and specialized capabilities for targeted use cases.
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
              AI in Cybersecurity
            </h3>
            <p style={{ color: "#6b7280" }}>
              Specialized AI solutions for threat detection, incident response, and security automation
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem",
            opacity: 0.6
          }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Coming Soon
            </h3>
            <p style={{ color: "#6b7280" }}>
              More vertical AI applications will be added here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 