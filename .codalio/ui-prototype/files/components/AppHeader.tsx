import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";


import { Bell, Command, Search, Settings } from "lucide-react";

        export default function AppHeader({ onOpenCommandPalette }: { onOpenCommandPalette: () => void }) {
        return (
            <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4"><Button variant="ghost" className="hidden min-w-64 justify-start gap-2 text-muted-foreground sm:flex" onClick={onOpenCommandPalette}><Search className="size-4" /><span>Search SyncPulse</span><kbd className="ml-auto rounded border bg-muted px-1.5 text-[10px]">⌘K</kbd></Button><div className="ml-auto flex items-center gap-2"><Badge variant="secondary" className="hidden gap-1.5 sm:flex"><span className="size-2 rounded-full bg-emerald-500" />All systems synced</Badge><Button variant="ghost" size="icon" className="relative" aria-label="Notifications"><Bell className="size-4" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" /></Button><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="gap-2 px-1"><Avatar className="size-7"><AvatarFallback className="bg-primary text-xs text-primary-foreground">AL</AvatarFallback></Avatar><span className="hidden text-sm sm:inline">Alex Lee</span></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem><Settings className="mr-2 size-4" />Workspace settings</DropdownMenuItem><DropdownMenuItem>Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></header>
        );
        }