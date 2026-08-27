import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { useModelIndex, useModelUpdate } from "@rhino-dev/rhino-react";

export default function SettingsTheme() {
  const { data } = useModelIndex("user_settings");
  const settings = (data as any)?.data || [];
  const updateMutation = useModelUpdate("user_settings");

  const currentSetting = settings[0] || { id: 1, theme: "dark", font_scale: 100, haptic_intensity: "medium" };

  const handleThemeChange = (val: string) => {
    if (currentSetting?.id) {
      updateMutation.mutate({ id: currentSetting.id, data: { theme: val } });
    }
  };

  const handleFontScaleChange = (val: number[]) => {
    if (currentSetting?.id) {
      updateMutation.mutate({ id: currentSetting.id, data: { font_scale: val[0] } });
    }
  };

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
        <div>
          <p className="text-sm text-muted-foreground">Appearance & Feedback</p>
          <h1 className="text-2xl font-semibold text-foreground">Theme & Ergonomics</h1>
        </div>
        <Card className="mt-6 border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Theme Selection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={currentSetting.theme || "dark"} onValueChange={handleThemeChange} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oled" id="oled" />
                <Label htmlFor="oled">OLED True Black</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Dark Mode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Light Mode</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label>Font Scale ({currentSetting.font_scale || 100}%)</Label>
              <Slider
                value={[currentSetting.font_scale || 100]}
                min={80}
                max={120}
                step={5}
                onValueChange={handleFontScaleChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
