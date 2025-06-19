import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - About" },
    { name: "description", content: "Contact information for Mohamad El Boudi" },
  ];
};

export default function AboutContact() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Contact
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "2rem" }}>
          Get in touch with me
        </p>
        
        <div style={{ 
          backgroundColor: "#f9fafb", 
          border: "1px solid #e5e7eb", 
          borderRadius: "8px", 
          padding: "2rem",
          marginBottom: "2rem",
          textAlign: "center"
        }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "0.5rem" }}>
            Mohamad El Boudi
          </h2>
          <p style={{ fontSize: "1.3rem", color: "#6b7280", marginBottom: "1.5rem" }}>
            AI Product Engineer
          </p>
          
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap"
          }}>
            <div style={{ textAlign: "center" }}>
              <a 
                href="https://linkedin.com/in/mohamad-el-boudi" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  backgroundColor: "#0077b5",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  transition: "background-color 0.2s"
                }}
              >
                LinkedIn
              </a>
            </div>
            
            <div style={{ 
              textAlign: "center",
              padding: "1rem",
              backgroundColor: "white",
              border: "2px solid #e5e7eb",
              borderRadius: "8px"
            }}>
              <p style={{ 
                fontSize: "0.9rem", 
                color: "#6b7280", 
                marginBottom: "1rem",
                fontWeight: "600"
              }}>
                Scan to connect on LinkedIn
              </p>
              <div style={{
                width: "200px",
                height: "200px",
                backgroundColor: "#f3f4f6",
                border: "2px dashed #d1d5db",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                color: "#6b7280",
                textAlign: "center",
                lineHeight: "1.4"
              }}>
                QR Code<br />
                LinkedIn Profile<br />
                <small>(Placeholder)</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 