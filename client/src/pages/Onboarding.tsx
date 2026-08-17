import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useModelIndex, useModelUpdate } from "@rhino-dev/rhino-react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();
  const { data } = useModelIndex("user_setting");
  const settings = (data as any)?.results || [];
  const updateMutation = useModelUpdate("user_setting");

  const currentSetting = settings[0];

  const handleFinish = () => {
    if (currentSetting?.id) {
      updateMutation.mutate(
        { id: currentSetting.id, data: { quick_add_shortcut_enabled: true } },
        { onSuccess: () => navigate("/dashboard") }
      );
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden p-6 max-w-md mx-auto">
      <Card className="border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Welcome to SnapDo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Let's enable quick voice shortcuts so you can capture tasks instantly without launching the app.
          </p>
          <Button className="w-full" onClick={handleFinish}>
            Enable Voice Shortcuts & Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
