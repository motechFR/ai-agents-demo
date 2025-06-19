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
  const [expandedSection, setExpandedSection] = useState<'blocks' | 'production' | null>('blocks');

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
  }, [isCollapsed]);

  const toggleSection = (section: 'blocks' | 'production') => {
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
                        <NavLink
                          to={`/levels/${level.level.toString().padStart(2, '0')}`}
                          className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: isCollapsed ? "center" : "flex-start",
                            width: "100%",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            minHeight: "2em"
                          }}
                        >
                          <div style={{
                            backgroundColor: "#4a5568",
                            color: "white",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: isCollapsed ? "0" : "8px",
                            flexShrink: 0,
                            fontSize: "0.8rem",
                            fontWeight: "bold"
                          }}>
                            {level.level}
                          </div>
                          {!isCollapsed && <span>{level.title}</span>}
                        </NavLink>
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
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isCollapsed ? "center" : "flex-start",
                      padding: "0.5rem 1rem",
                      color: "#cbd5e0",
                      fontWeight: "500",
                      cursor: "default",
                      borderRadius: "0.375rem"
                    }}>
                      <div style={{
                        backgroundColor: "#2d3748",
                        color: "white",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: isCollapsed ? "0" : "8px",
                        flexShrink: 0,
                        fontSize: "0.7rem",
                        fontWeight: "bold"
                      }}>
                        1
                      </div>
                      {!isCollapsed && <span>Tooling</span>}
                    </div>
                    {!isCollapsed && (
                      <ul style={{ margin: 0, padding: 0, paddingLeft: "1rem" }}>
                        <li>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.25rem 1rem",
                            color: "#a0aec0",
                            fontSize: "0.9rem"
                          }}>
                            <span style={{ marginRight: "8px", fontSize: "0.7rem" }}>1a</span>
                            <span>Models</span>
                          </div>
                        </li>
                        <li>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.25rem 1rem",
                            color: "#a0aec0",
                            fontSize: "0.9rem"
                          }}>
                            <span style={{ marginRight: "8px", fontSize: "0.7rem" }}>1b</span>
                            <span>Observability</span>
                          </div>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* 2 - Horizontal tools */}
                  <li>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isCollapsed ? "center" : "flex-start",
                      padding: "0.5rem 1rem",
                      color: "#cbd5e0",
                      fontWeight: "500",
                      cursor: "default",
                      borderRadius: "0.375rem"
                    }}>
                      <div style={{
                        backgroundColor: "#2d3748",
                        color: "white",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: isCollapsed ? "0" : "8px",
                        flexShrink: 0,
                        fontSize: "0.7rem",
                        fontWeight: "bold"
                      }}>
                        2
                      </div>
                      {!isCollapsed && <span>Horizontal tools</span>}
                    </div>
                    {!isCollapsed && (
                      <ul style={{ margin: 0, padding: 0, paddingLeft: "1rem" }}>
                        <li>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.25rem 1rem",
                            color: "#a0aec0",
                            fontSize: "0.9rem"
                          }}>
                            <span style={{ marginRight: "8px", fontSize: "0.7rem" }}>2a</span>
                            <span>ChatGPT</span>
                          </div>
                        </li>
                        <li>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.25rem 1rem",
                            color: "#a0aec0",
                            fontSize: "0.9rem"
                          }}>
                            <span style={{ marginRight: "8px", fontSize: "0.7rem" }}>2b</span>
                            <span>Workflow orchestration via n8n</span>
                          </div>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* 3 - Vertical AI */}
                  <li>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isCollapsed ? "center" : "flex-start",
                      padding: "0.5rem 1rem",
                      color: "#cbd5e0",
                      fontWeight: "500",
                      cursor: "default",
                      borderRadius: "0.375rem"
                    }}>
                      <div style={{
                        backgroundColor: "#2d3748",
                        color: "white",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: isCollapsed ? "0" : "8px",
                        flexShrink: 0,
                        fontSize: "0.7rem",
                        fontWeight: "bold"
                      }}>
                        3
                      </div>
                      {!isCollapsed && <span>Vertical AI</span>}
                    </div>
                    {!isCollapsed && (
                      <ul style={{ margin: 0, padding: 0, paddingLeft: "1rem" }}>
                        <li>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.25rem 1rem",
                            color: "#a0aec0",
                            fontSize: "0.9rem"
                          }}>
                            <span style={{ marginRight: "8px", fontSize: "0.7rem" }}>3a</span>
                            <span>AI in Cybersecurity</span>
                          </div>
                        </li>
                      </ul>
                    )}
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
