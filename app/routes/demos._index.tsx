import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "AI Agent Levels Demo" },
    { name: "description", content: "Demonstrating different levels of AI agents" },
  ];
};

export default function AgentDemosIndex() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>AI Agent Levels Demo</h1>
      <p>Select an agent level to see the demo:</p>
      <ul>
        <li>
          {/* Link to specific demo pages - adjust paths as needed */}
          <Link to="level1">Level 1 Agent</Link>
        </li>
        <li>
          <Link to="level2">Level 2 Agent</Link>
        </li>
        <li>
          <Link to="level3">Level 3 Agent</Link>
        </li>
        {/* Add more levels as required */}
      </ul>
    </div>
  );
}