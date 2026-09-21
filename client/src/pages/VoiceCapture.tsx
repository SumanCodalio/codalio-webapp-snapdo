import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useModelIndex } from "@rhino-dev/rhino-react";

export default function VoiceCapture() {
  const { data, isLoading: isPending } = useModelIndex("voice_command_log");
  const logs = (data as any)?.results || [];

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">Voice Assistant Integration</p>
        <h1 className="text-2xl font-semibold text-foreground">Voice Capture API</h1>
      </div>
      <Card className="border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Endpoint Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><span className="font-mono text-foreground font-semibold">POST /api/v1/voice-capture</span></p>
          <p>Payload: <code className="bg-muted px-1 rounded">{`{ "raw_transcript": "buy milk tomorrow" }`}</code></p>
        </CardContent>
      </Card>
      <Card className="border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Recent Voice Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className="text-sm text-muted-foreground">Loading logs…</div>
          ) : logs.length === 0 ? (
            <div className="text-sm text-muted-foreground">No voice command logs recorded yet.</div>
          ) : (
            <div className="space-y-2">
              {logs.map((log: any) => (
                <div key={log.id} className="border-b border-border pb-2 text-sm">
                  <p className="font-medium">{log.raw_transcript}</p>
                  <p className="text-xs text-muted-foreground">{log.provider || 'Voice'} • {log.parsed_action || 'Parsed'}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
