import "./styles.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import Layout from "./components/Layout";
import Inbox from "./pages/Inbox";
import InboxSnoozed from "./pages/InboxSnoozed";
import InboxTriage from "./pages/InboxTriage";
import Analytics from "./pages/Analytics";
import TeamDelegation from "./pages/TeamDelegation";
import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";
import AnalyticsActivity from "./pages/AnalyticsActivity";
import Landing from "./pages/Landing";
import IntegrationRules from "./pages/IntegrationRules";
import Onboarding from "./pages/Onboarding";
import Admin from "./pages/Admin";
import AdminIntegrations from "./pages/AdminIntegrations";
import AdminUsers from "./pages/AdminUsers";
import SettingsIntegrations from "./pages/SettingsIntegrations";

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
        <Route element={<Layout />}>
                <Route path="/inbox" element={<Inbox />} />
      <Route path="/inbox/snoozed" element={<InboxSnoozed />} />
      <Route path="/inbox/triage" element={<InboxTriage />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/team/delegation" element={<TeamDelegation />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/team" element={<Team />} />
      <Route path="/analytics/activity" element={<AnalyticsActivity />} />
      <Route path="/" element={<Landing />} />
      <Route path="/settings/integrations/rules" element={<IntegrationRules />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/integrations" element={<AdminIntegrations />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/settings/integrations" element={<SettingsIntegrations />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;