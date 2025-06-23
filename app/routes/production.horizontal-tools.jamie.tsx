import type { MetaFunction } from "@remix-run/node";
import { ImageSlider, type SliderImage } from "~/components/widgets/ImageSlider";

export const meta: MetaFunction = () => {
  return [
    { title: "Jamie - Horizontal Tools - AI in Production" },
    { name: "description", content: "Jamie AI integration and deployment strategies" },
  ];
};

export default function ProductionHorizontalToolsJamie() {
  const jamieImages: SliderImage[] = [
    {
      src: "/images/ai-in-prod/02-jamie.png",
      alt: "Jamie AI Meeting Workflow - Before, During, and After",
      caption: "Jamie's complete meeting workflow: preparation, real-time notes with context enrichment, and post-meeting knowledge retrieval and task automation"
    }
  ];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <nav style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1rem" }}>
            <span>AI in Production</span> / <span>Horizontal Tools</span> / <span style={{ color: "#111827" }}>Jamie</span>
          </nav>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Jamie
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "2rem" }}>
            Jamie AI integration strategies and best practices for production environments
          </p>
        </div>

        {/* Image Slider */}
        <div style={{ marginBottom: "2rem" }}>
          <ImageSlider 
            images={jamieImages}
            showThumbnails={false}
            showCaptions={true}
          />
        </div>
        
        {/* <div style={{ 
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
            This section will cover Jamie AI integration, workflow automation, 
            meeting transcription, action item extraction, and enterprise deployment patterns.
          </p>
        </div> */}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Meeting Intelligence
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Automated transcription and summarization
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Action Item Extraction
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Intelligent task identification and assignment
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Workflow Integration
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Seamless integration with existing tools
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 