import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

import { Activity, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
    const [syncing, setSyncing] = useState(false);
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full min-w-0 flex-col">
          <section className="space-y-5"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-primary">Platform Engineering</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">Command center</h1><p className="mt-1 text-sm text-muted-foreground">A concise view of work that needs your attention.</p></div><Button onClick={() => { setSyncing(true); window.setTimeout(() => setSyncing(false), 900); }} disabled={syncing}><RefreshCw className={`mr-2 size-4 ${syncing ? "animate-spin" : ""}`} />{syncing ? "Syncing…" : "Force sync"}</Button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{ label: "Open signal", value: "38", note: "+6 today", icon: Activity }, { label: "Blocked PRs", value: "7", note: "2 urgent", icon: AlertTriangle }, { label: "Stale issues", value: "12", note: "Needs owner", icon: AlertTriangle }, { label: "Sync health", value: "99.8%", note: "All sources live", icon: CheckCircle2 }].map(({ label, value, note, icon: Icon }) => <Card key={label}><CardContent className="p-5"><Icon className="mb-4 size-5 text-primary" /><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-bold text-foreground">{value}</p><p className="mt-2 text-xs text-muted-foreground">{note}</p></CardContent></Card>)}</div><div className="grid gap-4 xl:grid-cols-3"><Card className="xl:col-span-2"><CardHeader><CardTitle className="text-base">Priority queue</CardTitle></CardHeader><CardContent><Tabs defaultValue="now"><TabsList><TabsTrigger value="now">Now</TabsTrigger><TabsTrigger value="today">Today</TabsTrigger></TabsList><TabsContent value="now" className="mt-4 space-y-3">{["Review release blocker in API gateway", "Assign incident follow-up owner", "Confirm Jira rollout checklist"].map((task, index) => <div key={task} className="flex items-center justify-between rounded-lg border border-border p-3"><div><p className="text-sm font-medium text-foreground">{task}</p><p className="mt-1 text-xs text-muted-foreground">{index + 1} source linked · updated {index * 8 + 4}m ago</p></div><Badge variant={index === 0 ? "destructive" : "secondary"}>{index === 0 ? "Urgent" : "Active"}</Badge></div>)}</TabsContent><TabsContent value="today" className="mt-4 text-sm text-muted-foreground">14 more items scheduled for today.</TabsContent></Tabs></CardContent></Card><Card><CardHeader><CardTitle className="text-base">Sync reliability</CardTitle></CardHeader><CardContent className="space-y-4"><div><div className="mb-2 flex justify-between text-sm"><span>GitHub</span><span>100%</span></div><Progress value={100} /></div><div><div className="mb-2 flex justify-between text-sm"><span>Jira</span><span>98%</span></div><Progress value={98} /></div><div><div className="mb-2 flex justify-between text-sm"><span>Slack</span><span>99%</span></div><Progress value={99} /></div></CardContent></Card></div></section>
      </div>
    </div>
  );
}