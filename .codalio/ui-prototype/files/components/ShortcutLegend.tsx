import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";


        

const shortcuts: Record<string, Array<[string, string]>> = { Navigation: [["j / k", "Next / previous task"], ["g i", "Go to inbox"]], Actions: [["e", "Resolve"], ["s", "Snooze"], ["m", "Delegate"]], Global: [["⌘K", "Command palette"], ["?", "Show shortcuts"]] };
        export default function ShortcutLegend({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-w-xl"><DialogHeader><DialogTitle>Keyboard shortcuts</DialogTitle></DialogHeader><ScrollArea className="h-72 pr-4"><div className="space-y-5">{Object.entries(shortcuts).map(([group, items]) => <div key={group}><p className="mb-2 text-sm font-semibold text-foreground">{group}</p><div className="space-y-2">{items.map(([key, label]) => <div key={key} className="flex items-center justify-between text-sm text-muted-foreground"><span>{label}</span><Badge variant="secondary" className="font-mono">{key}</Badge></div>)}</div></div>)}</div></ScrollArea></DialogContent></Dialog>
        );
        }