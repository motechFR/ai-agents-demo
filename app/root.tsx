import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useEffect } from "react";
import appStylesHref from "./app.css?url";


import {
  Form,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit
} from "@remix-run/react";

import { createEmptyContact, getContacts } from "./data";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return json({ contacts, q });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};



export default function App() {

  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );


  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);


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
          <h1>Remix Contacts</h1>
          <div>
            <Form id="search-form" role="search"  onChange={(event) => {
              const isFirstSearch = q === null;
              submit(event.currentTarget, {
                replace: !isFirstSearch
              });
            }}>
              <input
                id="q"
                className={searching ? "loading" : ""}
                defaultValue={q || ""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={!searching} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            <ul>
              {contacts?.length ? contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`/contacts/${contact.id}`}>
                  {contact.first || contact.last ? (
                    <>
                      {`${contact.first} ${contact.last}`.trim()}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}
                   {contact.favorite ? (
                        <span>★</span>
                      ) : null}
                  </NavLink>
                </li>
              )) : (
                <li>No contacts</li>
              )}
            </ul>
          </nav>
        </div>

        <div id="detail" className={navigation.state === "loading" && !searching ? "loading" : ""}>
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
