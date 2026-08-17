import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";

import { Check, Pause, TimerReset, X } from "lucide-react";
import { useState } from "react";

export default function Focus() {
    const [paused, setPaused] = useState(false);
    const [done, setDone] = useState(false);
  return (
   <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (<Card className="w-full border-border bg-card shadow-none"><CardContent className="p-6 text-center"><p className="text-sm font-medium text-primary">Focus session</p><h1 className="mt-3 text-2xl font-semibold text-foreground">{done ? "Session complete" : "Send the project brief"}</h1><p className="mt-2 text-sm text-muted-foreground">{paused ? "Paused" : "25 minutes reserved for one thing."}</p><Progress className="mt-8" value={done ? 100 : paused ? 45 : 62} /><p className="mt-3 text-sm tabular-nums text-muted-foreground">{done ? "Done" : "15:32 remaining"}</p><div className="mt-8 flex justify-center gap-2"><Button variant="outline" size="icon" onClick={() => setPaused(!paused)}><Pause className="size-4" /></Button><Button onClick={() => setDone(true)}><Check className="size-4" />Complete</Button><Button variant="ghost" size="icon" onClick={() => { setDone(false); setPaused(false); }}><TimerReset className="size-4" /></Button></div><Button variant="link" className="mt-5" onClick={() => setDone(true)}><X className="size-4" />Exit focus</Button></CardContent></Card>)
      </div>
    </div>
  );
}