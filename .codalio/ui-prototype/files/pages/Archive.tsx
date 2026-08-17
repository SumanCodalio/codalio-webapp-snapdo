import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { CheckCircle2, RotateCcw, Search } from "lucide-react";
import { useState } from "react";

export default function Archive() {
    const [query, setQuery] = useState("");
    const [items, setItems] = useState(["Send Q2 invoice", "Update the project brief", "Call Maya"]);
  return (
   <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (<><div><p className="text-sm text-muted-foreground">Your completed work</p><h1 className="text-2xl font-semibold text-foreground">Completed</h1></div><div className="relative mt-5"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search completed tasks" className="pl-9" /></div><div className="mt-4">{items.filter((item) => item.toLowerCase().includes(query.toLowerCase())).map((item) => <div key={item} className="flex min-h-14 items-center gap-3 border-b border-border/70 py-4 text-muted-foreground"><CheckCircle2 className="size-4 text-primary" /><span className="flex-1 line-through">{item}</span><Button variant="ghost" size="sm" onClick={() => setItems((current) => current.filter((value) => value !== item))}><RotateCcw className="size-4" />Restore</Button></div>)}{!items.length && <p className="py-12 text-center text-sm text-muted-foreground">Nothing in the archive.</p>}</div><Badge variant="secondary" className="mt-5">{items.length} completed</Badge></>)
      </div>
    </div>
  );
}