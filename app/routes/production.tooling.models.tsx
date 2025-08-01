import type { MetaFunction } from "@remix-run/node";
import { ImageSlider, type SliderImage } from "~/components/widgets/ImageSlider";

export const meta: MetaFunction = () => {
  return [
    { title: "Models - Tooling - AI in Production" },
    { name: "description", content: "Model management, versioning, and deployment strategies" },
  ];
};

export default function ProductionToolingModels() {
  const modelImages: SliderImage[] = [
    {
      src: "/images/ai-in-prod/01-models.png",
      alt: "AI Models in Production",
      caption: "Model management, versioning, and deployment strategies for production AI systems"
    }
  ];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <nav style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1rem" }}>
            <span>AI in Production</span> / <span>Tooling</span> / <span style={{ color: "#111827" }}>Models</span>
          </nav>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Models
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "2rem" }}>
            Model management, versioning, and deployment strategies for production AI systems
          </p>
        </div>

        {/* Image Slider */}
        <div style={{ marginBottom: "2rem" }}>
          <ImageSlider 
            images={modelImages}
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
            This section will cover model management best practices, versioning strategies, 
            deployment pipelines, and performance optimization techniques for production AI models.
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
              Model Registry
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Centralized model storage and versioning
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Deployment Pipelines
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Automated model deployment workflows
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              A/B Testing
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Model performance comparison strategies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 