import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

import { Activity, AudioLines, CloudOff, Download, Gauge } from "lucide-react";
import { useState } from "react";

export default function AdminAnalytics() {
    const [exported, setExported] = useState(false);
  return (
   <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (
              (<><div className="flex items-end justify-between"><div><p className="text-sm text-muted-foreground">Platform telemetry</p><h1 className="text-2xl font-semibold text-foreground">System health</h1></div><Button variant="outline" onClick={() => setExported(true)}><Download className="size-4" />Export</Button></div>{exported && <p className="mt-3 text-sm text-primary">Telemetry export prepared.</p>}<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{ icon: Activity, label: "Active sessions", value: "1,284" }, { icon: AudioLines, label: "Voice parse accuracy", value: "97.8%" }, { icon: Gauge, label: "Median sync latency", value: "82 ms" }, { icon: CloudOff, label: "Offline queue", value: "14" }].map(({ icon: Icon, label, value }) => <Card key={label}><CardContent className="p-5"><Icon className="size-5 text-primary" /><p className="mt-4 text-2xl font-semibold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></CardContent></Card>)}</div><Card className="mt-5 border-border shadow-none"><CardHeader><CardTitle className="text-base">Voice accuracy log</CardTitle></CardHeader><CardContent className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Provider</TableHead><TableHead>Utterance</TableHead><TableHead>Confidence</TableHead><TableHead>Outcome</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Native</TableCell><TableCell>“Create a review task”</TableCell><TableCell>98.2%</TableCell><TableCell><Badge>Parsed</Badge></TableCell></TableRow></TableBody></Table></CardContent></Card></>)
      </div>
    </div>
  );
}