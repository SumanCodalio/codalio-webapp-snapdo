import React from "react";
import { Card, CardContent } from "../components/ui/card";

import { ChevronRight, Mic, MoonStar, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (<><div><p className="text-sm text-muted-foreground">Personalize SnapDo</p><h1 className="text-2xl font-semibold text-foreground">Settings</h1></div><Card className="mt-6 overflow-hidden border-border shadow-none"><CardContent className="p-0"><div className="flex items-center gap-3 border-b p-4"><UserRound className="size-5 text-primary" /><div><p className="font-medium text-foreground">Your workspace</p><p className="text-sm text-muted-foreground">Personal account</p></div></div><Link to="/settings/theme" className="flex items-center gap-3 border-b p-4 hover:bg-accent"><MoonStar className="size-5 text-primary" /><span className="flex-1 font-medium text-foreground">Appearance &amp; haptics</span><ChevronRight className="size-4 text-muted-foreground" /></Link><Link to="/settings/voice" className="flex items-center gap-3 p-4 hover:bg-accent"><Mic className="size-5 text-primary" /><span className="flex-1 font-medium text-foreground">Voice assistants</span><ChevronRight className="size-4 text-muted-foreground" /></Link></CardContent></Card></>)
      </div>
    </div>
  );
}