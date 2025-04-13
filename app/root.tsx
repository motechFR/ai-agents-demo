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

import { allDemoLevels } from "./lib/levels/definitions";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];




export default function App() {

  const navigation = useNavigation();

  const isNavigating = !!navigation.location;


  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>AI Agent Levels</h1>
          <nav>
            <ul>
              {allDemoLevels.map((level) => (
                <li key={level.level}>
                  <NavLink
                    to={`/levels/${level.level.toString().padStart(2, '0')}`}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
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
                      marginRight: "8px",
                      flexShrink: 0,
                      fontSize: "0.8rem",
                      fontWeight: "bold"
                    }}>
                      {level.level}
                    </div>
                    <span>{level.title}</span>
                  </NavLink>
                </li>
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
