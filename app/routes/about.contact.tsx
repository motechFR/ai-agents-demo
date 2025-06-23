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
          <p style={{ fontSize: "1.3rem", color: "#6b7280", marginBottom: "1.5rem", fontWeight: "bold" }}>
            AI Product Engineer
          </p>
          
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap"
          }}>
            
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
              <img 
                src="/qrcodes/linkedin-mo.png" 
                alt="LinkedIn QR Code for Mohamad El Boudi"
                style={{
                  width: "400px",
                  height: "400px",
                  borderRadius: "8px"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 