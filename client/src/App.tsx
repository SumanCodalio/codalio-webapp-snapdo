import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@rhino-dev/rhino-react";
import { AppOwnerProvider } from "./contexts/AppOwnerProvider";
import Layout from "./components/Layout";
import Focus from "./pages/Focus";
import Upcoming from "./pages/Upcoming";
import Archive from "./pages/Archive";
import Settings from "./pages/Settings";
import SettingsVoice from "./pages/SettingsVoice";
import SettingsTheme from "./pages/SettingsTheme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import VoiceCapture from "./pages/VoiceCapture";
import AdminLogin from "./pages/AdminLogin";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminFeatureFlags from "./pages/AdminFeatureFlags";
import Landing from "./pages/Landing";

// Rhino data hooks are react-query underneath, so the tree must sit inside a
// client or the first page that reads data throws and unmounts the app.
const queryClient = new QueryClient();

// Every page below this reads data, and the API answers 401 to anyone without
// a token. Redirecting here means a signed-out visitor never fires that
// request in the first place; the alternative is the request failing and the
// API client bouncing the browser, which reloads the page that fires it again.
function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppOwnerProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<RequireAuth />}>
                <Route path="/" element={<Landing />} />
                <Route path="/focus" element={<Focus />} />
                <Route path="/upcoming" element={<Upcoming />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/voice" element={<SettingsVoice />} />
                <Route path="/settings/theme" element={<SettingsTheme />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/voice-capture" element={<VoiceCapture />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/feature-flags" element={<AdminFeatureFlags />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppOwnerProvider>
    </AuthProvider>
    </QueryClientProvider>
  );
}
