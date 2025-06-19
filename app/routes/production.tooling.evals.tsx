import type { MetaFunction } from "@remix-run/node";
import { ImageSlider, type SliderImage } from "~/components/widgets/ImageSlider";

export const meta: MetaFunction = () => {
  return [
    { title: "Evals - Tooling - AI in Production" },
    { name: "description", content: "AI model evaluation frameworks and testing strategies" },
  ];
};

export default function ProductionToolingEvals() {
  const evalsImages: SliderImage[] = [
    {
      src: "/images/ai-in-prod/01-evals.jpg",
      alt: "AI Evaluation Frameworks",
      caption: "AI model evaluation frameworks, testing strategies, and performance assessment tools"
    }
  ];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <nav style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1rem" }}>
            <span>AI in Production</span> / <span>Tooling</span> / <span style={{ color: "#111827" }}>Evals</span>
          </nav>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Evals
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "2rem" }}>
            AI model evaluation frameworks, testing strategies, and performance assessment tools
          </p>
        </div>

        {/* Image Slider */}
        <div style={{ marginBottom: "2rem" }}>
          <ImageSlider 
            images={evalsImages}
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
            This section will cover comprehensive evaluation frameworks for AI models, including 
            automated testing pipelines, benchmark datasets, performance metrics, and continuous evaluation strategies.
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
              Automated Testing
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Continuous evaluation pipelines and frameworks
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Benchmark Datasets
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Standardized datasets for model comparison
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Performance Metrics
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Comprehensive evaluation metrics and KPIs
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Bias Detection
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Fairness evaluation and bias mitigation
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Red Teaming
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Adversarial testing and security evaluation
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "1.5rem"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Human Evaluation
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Human-in-the-loop evaluation workflows
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 