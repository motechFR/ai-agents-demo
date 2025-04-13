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
                  <NavLink to={`/levels/${level.level.toString().padStart(2, '0')}`} className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }>
                  {level.title}
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
