import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";

import { Moon, Sun, Vibrate } from "lucide-react";
import { useState } from "react";

export default function SettingsTheme() {
    const [theme, setTheme] = useState("System");
    const [scale, setScale] = useState(100);
    const [haptics, setHaptics] = useState(true);
  return (
   <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (<><div><p className="text-sm text-muted-foreground">Make it yours</p><h1 className="text-2xl font-semibold text-foreground">Appearance &amp; haptics</h1></div><Card className="mt-6 border-border shadow-none"><CardContent className="space-y-7 p-5"><div><Label className="font-medium">Theme</Label><RadioGroup value={theme} onValueChange={setTheme} className="mt-3 grid gap-2">{["System", "Light", "OLED black"].map((item) => <Label key={item} className="flex items-center gap-3 rounded-lg border p-3"><RadioGroupItem value={item} />{item === "Light" ? <Sun className="size-4 text-primary" /> : <Moon className="size-4 text-primary" />}{item}</Label>)}</RadioGroup></div><div><Label>Font scale: {scale}%</Label><Slider value={[scale]} min={80} max={140} step={5} onValueChange={(value) => setScale(value[0])} className="mt-4" /></div><div className="flex items-center gap-3"><Vibrate className="size-5 text-primary" /><div className="flex-1"><p className="font-medium text-foreground">Haptic feedback</p><p className="text-sm text-muted-foreground">A subtle tap on completion</p></div><Switch checked={haptics} onCheckedChange={setHaptics} /></div></CardContent></Card></>)
      </div>
    </div>
  );
}