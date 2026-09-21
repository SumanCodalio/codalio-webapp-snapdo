
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
        export default function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const go = (path: string) => { navigate(path); onOpenChange(false); };
        return (
            <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-w-2xl p-0"><DialogHeader className="sr-only"><DialogTitle>Command palette</DialogTitle></DialogHeader><Command><CommandInput placeholder="Search commands, tasks, and integrations…" value={query} onValueChange={setQuery} /><CommandList><CommandEmpty>No matching commands.</CommandEmpty><CommandGroup heading="Navigate"><CommandItem onSelect={() => go("/inbox")}>Open inbox <Badge variant="secondary" className="ml-auto">g i</Badge></CommandItem><CommandItem onSelect={() => go("/dashboard")}>Open dashboard</CommandItem></CommandGroup><CommandGroup heading="Actions"><CommandItem onSelect={() => go("/settings/integrations")}>Force sync GitHub webhooks</CommandItem><CommandItem onSelect={() => go("/inbox/triage")}>Create Jira ticket from Slack message</CommandItem></CommandGroup></CommandList></Command></DialogContent></Dialog>
        );
        }