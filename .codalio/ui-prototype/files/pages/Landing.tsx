import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import QuickCaptureButton from "../components/QuickCaptureButton";
import TaskRow from "../components/TaskRow";

import { ArrowUp, Check, Mic } from "lucide-react";
import { type FormEvent, useState } from "react";

export default function Landing() {
    const [draft, setDraft] = useState("");
    const [focused, setFocused] = useState("");
    const [tasks, setTasks] = useState([{ id: 1, title: "Send the project brief", due: "9:00 AM" }, { id: 2, title: "Call Maya about the launch", due: "5:00 PM" }, { id: 3, title: "Pick up groceries", due: "Later" }]);
    const completeTask = (id: number) => setTasks((current) => current.filter((task) => task.id !== id));
    const deferTask = (id: number) => setTasks((current) => current.map((task) => task.id === id ? { ...task, due: "Tomorrow" } : task));
    const addTask = (event: FormEvent) => { event.preventDefault(); const title = draft.trim(); if (!title) return; setTasks((current) => [...current, { id: Date.now(), title, due: "Today" }]); setDraft(""); };
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="w-full min-w-0">
          (
              (<><div className="mb-5 flex items-end justify-between"><div><p className="text-sm font-medium text-primary">Tuesday, May 14</p><h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">Today</h1></div><Badge variant="secondary">{tasks.length} open</Badge></div><div className="flex-1">{tasks.length ? tasks.map((task) => <TaskRow key={task.id} title={task.title} due={task.due} onComplete={() => completeTask(task.id)} onDefer={() => deferTask(task.id)} onOpenFocus={() => setFocused(task.title)} />) : <div className="grid place-items-center py-20 text-center"><div><Check className="mx-auto mb-3 size-8 text-primary" /><p className="font-medium text-foreground">Clear the list.</p><p className="mt-1 text-sm text-muted-foreground">Capture the next thing.</p></div></div>}{focused && <div className="mt-5 rounded-xl border border-primary/30 bg-accent p-4"><p className="text-sm font-medium text-accent-foreground">Focus mode: {focused}</p><Button size="sm" variant="link" className="mt-1 h-auto px-0" onClick={() => setFocused("")}>Exit focus</Button></div>}</div><div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-2xl border-t border-border bg-background/95 p-4 backdrop-blur"><form onSubmit={addTask} className="flex items-center gap-2"><Input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Add a task… “Call Maya tomorrow at 5pm”" className="min-h-12 rounded-xl bg-card text-base" /><TooltipProvider><Tooltip><TooltipTrigger asChild><Button type="button" variant="ghost" size="icon" onClick={() => setDraft("Voice note: schedule the brief for Friday")} aria-label="Voice capture"><Mic className="size-5" /></Button></TooltipTrigger><TooltipContent>Capture by voice</TooltipContent></Tooltip></TooltipProvider><Button type="submit" size="icon" className="size-11 rounded-xl" aria-label="Save task"><ArrowUp className="size-5" /></Button></form><div className="mt-2 flex items-center justify-between px-1"><p className="text-xs text-muted-foreground">Dates and priority are understood automatically</p><QuickCaptureButton onVoiceCapture={() => setDraft("Voice note: ")} /></div></div></>)
      </div>
    </div>
  );
}