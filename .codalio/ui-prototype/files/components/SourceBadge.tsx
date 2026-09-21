

import { Github, KanbanSquare, Mail, MessageSquare, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
const icons = { GitHub: Github, Jira: KanbanSquare, Slack: MessageSquare, "Microsoft Teams": Users, Email: Mail };

export default function SourceBadge({ source }: { source: string }) {
  const Icon = icons[source as keyof typeof icons] || Mail;
  return <TooltipProvider><Tooltip><TooltipTrigger asChild><Badge variant="secondary" className="gap-1 text-xs"><Icon className="size-3" />{source}</Badge></TooltipTrigger><TooltipContent>{source} source</TooltipContent></Tooltip></TooltipProvider>;
}