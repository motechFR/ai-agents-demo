import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Horizontal Tools - AI in Production" },
    { name: "description", content: "Cross-cutting AI tools and platforms for various use cases" },
  ];
};

export default function ProductionHorizontalTools() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Horizontal Tools
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "2rem" }}>
          Cross-cutting AI tools and platforms that can be applied across various use cases and industries
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
            Horizontal AI tools provide broad capabilities that can be leveraged across different domains 
            and use cases, offering flexibility and scalability for various business needs.
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
              ChatGPT
            </h3>
            <p style={{ color: "#6b7280" }}>
              General-purpose conversational AI for various applications
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Workflow Orchestration
            </h3>
            <p style={{ color: "#6b7280" }}>
              Automated workflow management and business process optimization
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 