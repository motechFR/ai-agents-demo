import type { MetaFunction } from "@remix-run/node";
import { ImageSlider } from "~/components/widgets/ImageSlider";

export const meta: MetaFunction = () => {
  return [
    { title: "AI in Cybersecurity – Autonomous Defense & Verification" },
    { name: "description", content: "How agentic AI slashes alert fatigue while preserving auditability for modern SOCs." },
    { name: "keywords", content: "AI cybersecurity,SOC automation,agentic AI,alert fatigue,LLM security" },
  ];
};

export default function ProductionVerticalAICybersecurity() {
  const silkRunnerImages = [
    {
      src: "/images/ai-in-prod/03-silkrunner.png",
      alt: "silkRunner autonomous investigation dashboard",
      caption: "silkRunner dashboard showing autonomous investigation workflow with agent reasoning steps"
    }
  ];

  return (
    <main className="ai-cyber-page">
      {/*
      title: AI in Cybersecurity – Autonomous Defense & Verification
      meta-description: How agentic AI slashes alert fatigue while preserving auditability for modern SOCs.
      keywords: AI cybersecurity,SOC automation,agentic AI,alert fatigue,LLM security
      */}
      
      <div style={{ padding: "4rem 2rem", textAlign: "center", backgroundColor: "#f8fafc" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "2rem", color: "#1e293b" }}>
          AI in Cybersecurity: From Alert Fatigue to Autonomous Defense
        </h1>
        
        <div style={{ maxWidth: "800px", margin: "0 auto", marginBottom: "2rem" }}>
          <ImageSlider 
            images={silkRunnerImages}
            showThumbnails={false}
            showCaptions={true}
            autoPlay={false}
          />
        </div>
        
        <p style={{ fontSize: "1.3rem", color: "#64748b", maxWidth: "800px", margin: "0 auto" }}>
          Agentic AI transforms SOC operations by autonomously investigating threats while maintaining full auditability and human oversight.
        </p>
      </div>

      <section className="problem-statement" style={{ padding: "4rem 2rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem", color: "#1e293b" }}>
            The Challenge in Security Operations
          </h2>
          <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem", color: "#374151" }}>
            Security incidents are messy, ambiguous, and never quite the same.
          </p>
          <p style={{ fontSize: "1.2rem", color: "#374151" }}>
            SOC analysts spend countless hours on repetitive investigations while threats evolve faster than manual processes can adapt.
          </p>
        </div>
      </section>

      <section className="agentic-difference" style={{ padding: "4rem 2rem", backgroundColor: "#f1f5f9" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#1e293b" }}>
            Why Agentic Matters in Security Operations
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "600", marginBottom: "1rem", color: "#1e293b" }}>
                Generalizes Across Scenarios
              </h3>
              <p style={{ color: "#64748b" }}>
                Handles known and unknown threats without requiring a new rule or script.
              </p>
            </div>
            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "600", marginBottom: "1rem", color: "#1e293b" }}>
                Reduces Cognitive Load
              </h3>
              <p style={{ color: "#64748b" }}>
                Offloads repetitive and time-consuming investigations, freeing analysts to focus on threat hunting and strategic defense.
              </p>
            </div>
            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "600", marginBottom: "1rem", color: "#1e293b" }}>
                Accelerates Time to Insight
              </h3>
              <p style={{ color: "#64748b" }}>
                Investigations that once took hours are completed in minutes, with comprehensive, explainable results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="spidersilk-intro" style={{ padding: "4rem 2rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem", color: "#1e293b" }}>
            About spiderSilk
          </h2>
          <p style={{ fontSize: "1.3rem", marginBottom: "2rem", color: "#374151", maxWidth: "800px", margin: "0 auto 2rem" }}>
            spiderSilk is an AI-native cybersecurity company delivering Resonance, a leading Exposure Management platform.
          </p>
          <p style={{ fontSize: "1.2rem", color: "#64748b", maxWidth: "800px", margin: "0 auto" }}>
            Our latest innovation, silkRunner, expands our work in Agentic frameworks, bringing autonomous AI to security operations for faster, smarter threat response.
          </p>
        </div>
      </section>

      <section className="silkrunner-showcase" style={{ padding: "4rem 2rem", backgroundColor: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{ backgroundColor: "white", padding: "3rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "2rem", textAlign: "center", color: "#1e293b" }}>
              Agentic Intelligence at the Core
            </h3>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", textAlign: "center", color: "#64748b" }}>
              At the heart of silkRunner is a dynamic, goal-oriented agentic system that brings the power of LLMs and autonomous reasoning into the cybersecurity domain.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
              <div style={{ textAlign: "center" }}>
                <h4 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "1rem", color: "#1e293b" }}>
                  Playbook-Free Operation
                </h4>
                <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                  Unlike traditional automation tools that rely on rigid, pre-scripted workflows, silkRunner agents dynamically plan and execute investigative steps based on the context of each incident.
                </p>
              </div>
              
              <div style={{ textAlign: "center" }}>
                <h4 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "1rem", color: "#1e293b" }}>
                  Problem-Solving Agents
                </h4>
                <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                  Each alert triggers an agent that identifies goals, gathers evidence, reasons through the scenario, and adapts to evolving data - just like a human analyst would.
                </p>
              </div>
              
              <div style={{ textAlign: "center" }}>
                <h4 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "1rem", color: "#1e293b" }}>
                  Composable Skills and Tools
                </h4>
                <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                  Agents leverage a toolkit of MCP-integrated capabilities to perform tasks such as log analysis, threat enrichment, and correlation, chaining them together intelligently to reach conclusions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proven-outcomes" style={{ padding: "4rem 2rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#1e293b" }}>
            Proven Outcomes
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#3b82f6", marginBottom: "0.5rem" }}>90%</div>
              <p style={{ color: "#64748b", fontWeight: "600" }}>Reduction in investigation time</p>
            </div>
            <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981", marginBottom: "0.5rem" }}>24/7</div>
              <p style={{ color: "#64748b", fontWeight: "600" }}>Operations with no analyst fatigue</p>
            </div>
            <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#f59e0b", marginBottom: "0.5rem" }}>Privacy-First</div>
              <p style={{ color: "#64748b", fontWeight: "600" }}>On-prem & offline LLM support</p>
            </div>
            <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#8b5cf6", marginBottom: "0.5rem" }}>Seamless</div>
              <p style={{ color: "#64748b", fontWeight: "600" }}>SIEM, SOAR, and MCP integration</p>
            </div>
          </div>
        </div>
      </section>

      <section className="conclusion" style={{ padding: "4rem 2rem", backgroundColor: "#f1f5f9" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem", color: "#1e293b" }}>
            The Future of Security Operations
          </h2>
          <p style={{ fontSize: "1.3rem", marginBottom: "2rem", color: "#374151" }}>
            silkRunner demonstrates what's possible when agentic AI is applied to real-world security operations.
          </p>
          <p style={{ fontSize: "1.2rem", color: "#64748b" }}>
            Bringing autonomy, speed, and intelligence to one of the most high-stakes environments in tech.
          </p>
        </div>
      </section>

      <section className="final-cta" style={{ padding: "4rem 2rem", backgroundColor: "#1e293b", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem", color: "white" }}>
          Experience Autonomous Defense
        </h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "3rem", color: "#94a3b8", maxWidth: "600px", margin: "0 auto 3rem" }}>
          See how silkRunner transforms security operations with agentic AI.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ 
            backgroundColor: "#3b82f6", 
            color: "white", 
            padding: "1rem 2rem", 
            fontSize: "1.1rem", 
            border: "none", 
            borderRadius: "8px", 
            cursor: "pointer",
            fontWeight: "600"
          }}>
            Learn More About silkRunner
          </button>
          <a href="https://www.spidersilk.com" style={{ 
            color: "#94a3b8", 
            textDecoration: "underline", 
            fontSize: "1.1rem", 
            padding: "1rem 2rem",
            display: "inline-block"
          }}>
            Visit spidersilk.com
          </a>
        </div>
      </section>
    </main>
  );
} 