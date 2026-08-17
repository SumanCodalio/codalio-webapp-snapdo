import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";


import { Mic } from "lucide-react";

        export default function QuickCaptureButton({ onVoiceCapture }: { onVoiceCapture: () => void }) {
        return (
            (<TooltipProvider><Tooltip><TooltipTrigger asChild><Button type="button" size="icon" className="size-12 rounded-full bg-primary text-primary-foreground shadow-sm" onClick={onVoiceCapture} aria-label="Capture a task by voice"><Mic className="size-5" /></Button></TooltipTrigger><TooltipContent>Capture by voice</TooltipContent></Tooltip></TooltipProvider>)
        );
        }