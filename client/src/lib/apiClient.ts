import axios from "axios";
import { configureApi } from "@rhino-dev/rhino-react";

// This backend serves Rhino resources at /api/<model> with no organization
// segment, which is what "subdomain" tenancy expects. Left at the default
// "path" mode the hooks request /api/<org>/<model> — a URL the server does not
// serve — and every data hook throws "Organization slug is required".
configureApi({ tenancy: "subdomain" });

// Rhino v4 authenticates with a bearer token returned by POST /api/auth/login.
// Registered once at boot: storing the token was pointless while nothing sent it.
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
