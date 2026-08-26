import { configureApi } from "@rhino-dev/rhino-react";

// This backend serves Rhino resources at /api/<model> with no organization
// segment, which is what "subdomain" tenancy expects. Left at the default
// "path" mode the hooks request /api/<org>/<model> — a URL the server does not
// serve — and every data hook throws "Organization slug is required".
//
// onUnauthorized replaces the library default, which sends the browser to "/"
// on any 401. Since "/" itself loads tasks, a signed-out visit reloaded the
// page, re-fetched, got another 401 and reloaded again — the flicker. Send
// them to the login screen instead, and only when they are not already there,
// so a 401 can never re-enter this handler.
configureApi({
  tenancy: "subdomain",
  onUnauthorized: () => {
    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  },
});
