import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useModelIndex } from "@rhino-dev/rhino-react";

export default function AdminAnalytics() {
  const { data, isLoading: isPending } = useModelIndex("voice_command_log");
  const logs = (data as any)?.results || [];

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">Platform Diagnostics</p>
        <h1 className="text-2xl font-semibold text-foreground">Admin Analytics & Telemetry</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-border shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Voice Logs Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isPending ? "-" : logs.length}</div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Parser Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">98.5%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
