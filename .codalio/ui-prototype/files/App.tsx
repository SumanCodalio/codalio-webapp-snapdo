import "./styles.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Focus from "./pages/Focus";
import Upcoming from "./pages/Upcoming";
import Archive from "./pages/Archive";
import Settings from "./pages/Settings";
import SettingsVoice from "./pages/SettingsVoice";
import SettingsTheme from "./pages/SettingsTheme";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import VoiceCapture from "./pages/VoiceCapture";
import AdminLogin from "./pages/AdminLogin";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminFeatureFlags from "./pages/AdminFeatureFlags";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<Layout />}>
                <Route path="/focus" element={<Focus />} />
      <Route path="/upcoming" element={<Upcoming />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/voice" element={<SettingsVoice />} />
      <Route path="/settings/theme" element={<SettingsTheme />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/api/v1/voice-capture" element={<VoiceCapture />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
      <Route path="/admin/feature-flags" element={<AdminFeatureFlags />} />
      <Route path="/" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;