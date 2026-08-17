import { Badge } from "./ui/badge";
import { Button } from "./ui/button";


import { Check, Clock3, GripVertical } from "lucide-react";

        export default function TaskRow({ title, due, completed = false, onComplete, onDefer, onOpenFocus }: { title: string; due?: string; completed?: boolean; onComplete: () => void; onDefer: () => void; onOpenFocus: () => void }) {
        return (
            (<div className={`group flex min-h-14 items-center gap-3 border-b border-border/70 py-3 ${completed ? "text-muted-foreground" : ""}`}><Button type="button" variant="outline" size="icon" className="size-8 shrink-0 rounded-full" onClick={onComplete} aria-label={`Complete ${title}`}><Check className="size-4" /></Button><button type="button" onClick={onOpenFocus} className={`min-w-0 flex-1 text-left text-sm font-medium ${completed ? "line-through" : "text-foreground"}`}>{title}</button>{due && <Badge variant="secondary" className="hidden sm:inline-flex gap-1"><Clock3 className="size-3" />{due}</Badge>}<Button type="button" variant="ghost" size="icon" className="size-8" onClick={onDefer} aria-label={`Defer ${title}`}><GripVertical className="size-4" /></Button></div>)
        );
        }