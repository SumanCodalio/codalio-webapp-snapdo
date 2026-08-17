import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";

import { ArrowUpRight, CheckCircle2, Flame, Inbox, Mic } from "lucide-react";
export default function Dashboard() {
  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (
              (<><div><p className="text-sm text-muted-foreground">A calm view of your progress</p><h1 className="text-2xl font-semibold text-foreground">Your momentum</h1></div><div className="mt-6 grid gap-4 sm:grid-cols-3"><Card><CardContent className="p-5"><CheckCircle2 className="size-5 text-primary" /><p className="mt-4 text-2xl font-semibold">18</p><p className="text-sm text-muted-foreground">Tasks completed</p></CardContent></Card><Card><CardContent className="p-5"><Flame className="size-5 text-orange-500" /><p className="mt-4 text-2xl font-semibold">6 days</p><p className="text-sm text-muted-foreground">Capture streak</p></CardContent></Card><Card><CardContent className="p-5"><Inbox className="size-5 text-primary" /><p className="mt-4 text-2xl font-semibold">82%</p><p className="text-sm text-muted-foreground">Inbox to zero</p><Progress value={82} className="mt-3" /></CardContent></Card></div><Card className="mt-5 border-border shadow-none"><CardHeader className="flex-row items-center justify-between"><CardTitle className="text-base">Recent capture activity</CardTitle><Button variant="ghost" size="sm">View all<ArrowUpRight className="size-4" /></Button></CardHeader><CardContent className="space-y-3"><div className="flex items-center gap-3"><Mic className="size-4 text-primary" /><span className="flex-1 text-sm">“Remind me to send the brief Friday”</span><Badge>Captured</Badge></div><div className="flex items-center gap-3"><Mic className="size-4 text-primary" /><span className="flex-1 text-sm">“Pick up groceries after work”</span><Badge variant="secondary">Saved</Badge></div></CardContent></Card></>)
      </div>
    </div>
  );
}