import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";

import { CheckCircle2, ExternalLink, Mic } from "lucide-react";
import { useState } from "react";

export default function SettingsVoice() {
    const [siri, setSiri] = useState(true);
    const [google, setGoogle] = useState(false);
    const [tested, setTested] = useState(false);
  return (
   <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (
              (<><div><p className="text-sm text-muted-foreground">Capture tasks hands-free</p><h1 className="text-2xl font-semibold text-foreground">Voice assistants</h1></div><Card className="mt-6 border-border shadow-none"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><Mic className="size-4 text-primary" />Integrations</CardTitle></CardHeader><CardContent className="space-y-4"><div className="flex items-center gap-3"><div className="flex-1"><p className="font-medium text-foreground">Siri Shortcuts</p><p className="text-sm text-muted-foreground">Add tasks from your assistant</p></div><Switch checked={siri} onCheckedChange={setSiri} /></div><div className="flex items-center gap-3"><div className="flex-1"><p className="font-medium text-foreground">Google Assistant</p><p className="text-sm text-muted-foreground">Add tasks from your assistant</p></div><Switch checked={google} onCheckedChange={setGoogle} /></div><div className="rounded-lg bg-muted p-4"><Badge variant="secondary"><CheckCircle2 className="mr-1 size-3" />Example</Badge><p className="mt-2 text-sm text-foreground">“Add a task to SnapDo”</p></div><Button variant="outline" onClick={() => setTested(true)}><ExternalLink className="size-4" />Test voice command</Button>{tested && <p className="text-sm text-primary">Test command ready to capture.</p>}</CardContent></Card></>)
      </div>
    </div>
  );
}