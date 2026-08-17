import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { NavLink } from "react-router-dom";
import { Mic, Palette, Shield } from "lucide-react";

export default function Settings() {
  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">Preferences</p>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
      </div>
      <Card className="border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Configuration Menu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <NavLink to="/settings/voice" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent text-foreground">
            <Mic className="size-5 text-primary" />
            <div>
              <p className="font-medium">Voice Assistants</p>
              <p className="text-xs text-muted-foreground">Siri Shortcuts & Google Assistant setup</p>
            </div>
          </NavLink>
          <NavLink to="/settings/theme" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent text-foreground">
            <Palette className="size-5 text-primary" />
            <div>
              <p className="font-medium">Theme & Ergonomics</p>
              <p className="text-xs text-muted-foreground">OLED true-dark mode & font scaling</p>
            </div>
          </NavLink>
          <NavLink to="/admin/feature-flags" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent text-foreground">
            <Shield className="size-5 text-primary" />
            <div>
              <p className="font-medium">Admin Feature Flags</p>
              <p className="text-xs text-muted-foreground">Experimental feature controls</p>
            </div>
          </NavLink>
        </CardContent>
      </Card>
    </div>
  );
}
