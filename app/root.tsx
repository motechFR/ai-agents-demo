import type { LinksFunction } from "@remix-run/node";
import appStylesHref from "./app.css?url";

import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation
} from "@remix-run/react";
import React, { useState, useEffect } from "react";
import { allDemoLevels } from "../server/lib/levels/definitions";
import { SidebarItem } from "./components/SidebarItem";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export default function App() {
  const navigation = useNavigation();
  const isNavigating = !!navigation.location;
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // We can't access localStorage during SSR, so we need to return a default value
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });
  const [expandedSection, setExpandedSection] = useState<'blocks' | 'production' | 'about' | null>('blocks');

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
  }, [isCollapsed]);

  const toggleSection = (section: 'blocks' | 'production' | 'about') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar" className={isCollapsed ? "collapsed" : ""}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>AI Agent Levels</h1>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                fontSize: "1.2rem"
              }}
            >
              {isCollapsed ? "→" : "←"}
            </button>
          </div>
          <nav>
            {/* AI Agent Building Blocks Section */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 
                onClick={() => toggleSection('blocks')}
                style={{
                  color: "#cbd5e0",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  paddingLeft: isCollapsed ? "0" : "0.5rem",
                  textAlign: isCollapsed ? "center" : "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isCollapsed ? "center" : "space-between"
                }}
              >
                <span>{isCollapsed ? "BLOCKS" : "AI Agent Building Blocks"}</span>
                {!isCollapsed && (
                  <span style={{ fontSize: "0.8rem" }}>
                    {expandedSection === 'blocks' ? '▼' : '▶'}
                  </span>
                )}
              </h2>
              {expandedSection === 'blocks' && (
                <ul style={{ margin: 0, padding: 0 }}>
                  {allDemoLevels.map((level, index) => (
                    <React.Fragment key={level.level}>
                      <li>
                        <SidebarItem
                          label={level.title}
                          badge={level.level}
                          to={`/levels/${level.level.toString().padStart(2, '0')}`}
                          isCollapsed={isCollapsed}
                          variant="primary"
                        />
                      </li>
                      {index === allDemoLevels.length - 2 && (
                        <hr style={{ margin: '0.5rem 0', borderTop: '1px solid #4a5568' }} />
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              )}
            </div>

            {/* AI in Production Section */}
            <div>
              <h2 
                onClick={() => toggleSection('production')}
                style={{
                  color: "#cbd5e0",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  paddingLeft: isCollapsed ? "0" : "0.5rem",
                  textAlign: isCollapsed ? "center" : "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isCollapsed ? "center" : "space-between"
                }}
              >
                <span>{isCollapsed ? "PROD" : "AI in Production"}</span>
                {!isCollapsed && (
                  <span style={{ fontSize: "0.8rem" }}>
                    {expandedSection === 'production' ? '▼' : '▶'}
                  </span>
                )}
              </h2>
              {expandedSection === 'production' && (
                <ul style={{ margin: 0, padding: 0 }}>
                  {/* 1 - Tooling */}
                  <li>
                    <SidebarItem
                      label="Tooling"
                      badge="1"
                      to="/production/tooling"
                      isCollapsed={isCollapsed}
                      variant="secondary"
                    />
                    {!isCollapsed && (
                      <ul style={{ margin: 0, padding: 0, paddingLeft: "1rem" }}>
                        <li>
                          <SidebarItem
                            label="Models"
                            badge="1a"
                            to="/production/tooling/models"
                            isCollapsed={isCollapsed}
                            variant="sub"
                          />
                        </li>
                        <li>
                          <SidebarItem
                            label="Observability"
                            badge="1b"
                            to="/production/tooling/observability"
                            isCollapsed={isCollapsed}
                            variant="sub"
                          />
                        </li>
                        <li>
                          <SidebarItem
                            label="Evals"
                            badge="1c"
                            to="/production/tooling/evals"
                            isCollapsed={isCollapsed}
                            variant="sub"
                          />
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* 2 - Horizontal tools */}
                  <li>
                    <SidebarItem
                      label="Horizontal tools"
                      badge="2"
                      to="/production/horizontal-tools"
                      isCollapsed={isCollapsed}
                      variant="secondary"
                    />
                    {!isCollapsed && (
                      <ul style={{ margin: 0, padding: 0, paddingLeft: "1rem" }}>
                        <li>
                          <SidebarItem
                            label="ChatGPT"
                            badge="2a"
                            to="/production/horizontal-tools/chatgpt"
                            isCollapsed={isCollapsed}
                            variant="sub"
                          />
                        </li>
                        <li>
                          <SidebarItem
                            label="Jamie"
                            badge="2b"
                            to="/production/horizontal-tools/jamie"
                            isCollapsed={isCollapsed}
                            variant="sub"
                          />
                        </li>
                        <li>
                          <SidebarItem
                            label="Workflow orchestration via n8n"
                            badge="2c"
                            to="/production/horizontal-tools/workflow-orchestration"
                            isCollapsed={isCollapsed}
                            variant="sub"
                          />
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* 3 - Vertical AI */}
                  <li>
                    <SidebarItem
                      label="Vertical AI"
                      badge="3"
                      to="/production/vertical-ai"
                      isCollapsed={isCollapsed}
                      variant="secondary"
                    />
                    {!isCollapsed && (
                      <ul style={{ margin: 0, padding: 0, paddingLeft: "1rem" }}>
                        <li>
                          <SidebarItem
                            label="AI in Cybersecurity"
                            badge="3a"
                            to="/production/vertical-ai/cybersecurity"
                            isCollapsed={isCollapsed}
                            variant="sub"
                          />
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </div>

            {/* About Section */}
            <div style={{ marginTop: "1.5rem" }}>
              <h2 
                onClick={() => toggleSection('about')}
                style={{
                  color: "#cbd5e0",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  paddingLeft: isCollapsed ? "0" : "0.5rem",
                  textAlign: isCollapsed ? "center" : "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isCollapsed ? "center" : "space-between"
                }}
              >
                <span>{isCollapsed ? "ABOUT" : "About"}</span>
                {!isCollapsed && (
                  <span style={{ fontSize: "0.8rem" }}>
                    {expandedSection === 'about' ? '▼' : '▶'}
                  </span>
                )}
              </h2>
              {expandedSection === 'about' && (
                <ul style={{ margin: 0, padding: 0 }}>
                  <li>
                    <SidebarItem
                      label="Contact"
                      badge="1"
                      to="/about/contact"
                      isCollapsed={isCollapsed}
                      variant="secondary"
                    />
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>

        <div id="detail" className={isNavigating ? "loading" : ""}>
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
