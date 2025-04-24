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

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
  }, [isCollapsed]);

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
            <ul>
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
