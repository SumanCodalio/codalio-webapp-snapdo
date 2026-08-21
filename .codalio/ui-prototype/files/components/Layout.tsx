
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ChartNoAxesCombined, CircleHelp, Inbox, PanelsTopLeft, Plug, ShieldCheck, Sparkles, Users } from "lucide-react";

import AppHeader from "./AppHeader";
import CommandPalette from "./CommandPalette";
import ShortcutLegend from "./ShortcutLegend";
        export default function Layout({}) {
  const [collapsed, setCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const location = useLocation();
        return (
            <TooltipProvider><div className="flex min-h-screen w-full bg-background text-foreground"><aside className={`hidden shrink-0 border-r border-border bg-card transition-all duration-200 lg:flex lg:flex-col ${collapsed ? "w-16" : "w-[220px]"}`}><div className="flex h-12 items-center gap-2 px-3"><div className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">S</div>{!collapsed && <span className="font-semibold tracking-tight">SyncPulse</span>}<Button variant="ghost" size="icon" className="ml-auto size-7" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar"><PanelsTopLeft className="size-4" /></Button></div><nav className="flex-1 space-y-1 px-2 pt-4">{[{ label: "Inbox", path: "/inbox", icon: Inbox, badge: true }, { label: "Dashboard", path: "/dashboard", icon: PanelsTopLeft }, { label: "Team", path: "/team", icon: Users }, { label: "Analytics", path: "/analytics", icon: ChartNoAxesCombined }, { label: "Integrations", path: "/settings/integrations", icon: Plug }, { label: "Onboarding", path: "/onboarding", icon: Sparkles }, { label: "Admin", path: "/admin", icon: ShieldCheck }].map(({ label, path, icon: Icon, badge }) => <Tooltip key={path}><TooltipTrigger asChild><Link to={path} className={`flex h-9 items-center gap-3 rounded-md px-2 text-sm transition-colors ${location.pathname === path ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><Icon className="size-4 shrink-0" />{!collapsed && <span>{label}</span>}{!collapsed && badge && <Badge className="ml-auto h-5 min-w-5 justify-center px-1">8</Badge>}</Link></TooltipTrigger>{collapsed && <TooltipContent side="right">{label}</TooltipContent>}</Tooltip>)}</nav><div className="p-2"><Separator className="mb-2" /><div className="rounded-md bg-muted p-2 text-xs text-muted-foreground"><div className="flex items-center gap-2"><span className="size-2 shrink-0 rounded-full bg-emerald-500" />{!collapsed && "Sync healthy"}</div>{!collapsed && <p className="mt-1">All sources live</p>}</div><Button variant="ghost" className="mt-2 w-full justify-start gap-3 text-muted-foreground" onClick={() => setShortcutsOpen(true)}><CircleHelp className="size-4" />{!collapsed && "Shortcuts"}</Button></div></aside><main className="flex min-w-0 flex-1 flex-col"><AppHeader onOpenCommandPalette={() => setCommandOpen(true)} /><div className="min-w-0 flex-1 p-4 lg:p-5"><Outlet /></div></main><CommandPalette open={commandOpen} onOpenChange={setCommandOpen} /><ShortcutLegend open={shortcutsOpen} onOpenChange={setShortcutsOpen} /></div></TooltipProvider>
        );
        }