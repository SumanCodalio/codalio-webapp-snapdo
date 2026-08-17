import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";

import { RotateCcw, ToggleRight } from "lucide-react";
import { useState } from "react";

export default function AdminFeatureFlags() {
    const defaultFlags = { "New voice parser": true, "Haptic completion": true, "Focus mode v2": false, "Offline sync diagnostics": false };
    const [flags, setFlags] = useState(defaultFlags);
  return (
   <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (<><div><p className="text-sm text-muted-foreground">Organization controls</p><h1 className="text-2xl font-semibold text-foreground">Feature flags</h1></div><Card className="mt-6 border-border shadow-none"><CardHeader className="flex-row items-center justify-between"><CardTitle className="flex items-center gap-2 text-base"><ToggleRight className="size-4 text-primary" />Release controls</CardTitle><Button variant="outline" size="sm" onClick={() => setFlags(defaultFlags)}><RotateCcw className="size-4" />Reset</Button></CardHeader><CardContent className="divide-y">{Object.entries(flags).map(([name, enabled]) => <div key={name} className="flex items-center gap-4 py-4"><div className="flex-1"><p className="font-medium text-foreground">{name}</p><Badge variant={enabled ? "default" : "secondary"} className="mt-1">{enabled ? "Enabled" : "Disabled"}</Badge></div><Switch checked={enabled} onCheckedChange={(value) => setFlags({ ...flags, [name]: value })} /></div>)}</CardContent></Card></>)
      </div>
    </div>
  );
}