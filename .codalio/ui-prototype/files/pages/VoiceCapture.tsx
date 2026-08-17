import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Textarea } from "../components/ui/textarea";

import { CheckCircle2, Mic, Play } from "lucide-react";
import { useState } from "react";

export default function VoiceCapture() {
    const [utterance, setUtterance] = useState("");
    const [result, setResult] = useState(false);
  return (
   <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (
              (<><div><p className="text-sm text-muted-foreground">Developer tools</p><h1 className="text-2xl font-semibold text-foreground">Voice capture</h1></div><Card className="mt-6 border-border shadow-none"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><Mic className="size-4 text-primary" />Test an intent</CardTitle></CardHeader><CardContent><Textarea value={utterance} onChange={(event) => setUtterance(event.target.value)} placeholder="e.g. Remind me to send the brief Friday at 9am" /><Button className="mt-3" onClick={() => setResult(true)}><Play className="size-4" />Run capture</Button>{result && <div className="mt-4 rounded-lg bg-muted p-4 text-sm"><CheckCircle2 className="mr-2 inline size-4 text-primary" />Task parsed: <strong>Send the brief</strong> · Friday, 9:00 AM</div>}</CardContent></Card><Card className="mt-5 border-border shadow-none"><CardHeader><CardTitle className="text-base">Command log</CardTitle></CardHeader><CardContent className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Utterance</TableHead><TableHead>Parsed task</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>“Schedule a design review”</TableCell><TableCell>Design review</TableCell><TableCell><Badge>Parsed</Badge></TableCell></TableRow></TableBody></Table></CardContent></Card></>)
      </div>
    </div>
  );
}