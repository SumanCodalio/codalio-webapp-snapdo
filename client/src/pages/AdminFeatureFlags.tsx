import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { useModelIndex, useModelUpdate } from "@rhino-dev/rhino-react";

export default function AdminFeatureFlags() {
  const { data } = useModelIndex("user_settings");
  const settings = (data as any)?.data || [];
  const updateMutation = useModelUpdate("user_settings");

  const setting = settings[0] || { id: 1, quick_add_shortcut_enabled: true, sound_effects_enabled: true };

  const toggleFlag = (key: string, value: boolean) => {
    if (setting?.id) {
      updateMutation.mutate({ id: setting.id, data: { [key]: value } });
    }
  };

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">Experimental Controls</p>
        <h1 className="text-2xl font-semibold text-foreground">Admin Feature Flags</h1>
      </div>
      <Card className="border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base">System Toggles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Quick Add Voice Shortcut</p>
              <p className="text-sm text-muted-foreground">Enable instant background voice intent processing</p>
            </div>
            <Switch
              checked={!!setting.quick_add_shortcut_enabled}
              onCheckedChange={(val) => toggleFlag("quick_add_shortcut_enabled", val)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Haptic Sound Effects</p>
              <p className="text-sm text-muted-foreground">Tactile feedback on task completion</p>
            </div>
            <Switch
              checked={!!setting.sound_effects_enabled}
              onCheckedChange={(val) => toggleFlag("sound_effects_enabled", val)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
