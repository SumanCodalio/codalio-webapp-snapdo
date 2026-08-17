import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Check, Pause, TimerReset, X } from "lucide-react";
import { useModelIndex, useModelUpdate } from "@rhino-dev/rhino-react";
import { useNavigate } from "react-router-dom";

export default function Focus() {
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const { data } = useModelIndex("task");
  const tasks = (data as any)?.results || [];
  const updateMutation = useModelUpdate("task");

  const focusTask = tasks.find((t: any) => t.status !== "completed") || {
    id: 1,
    title: "Send the project brief",
  };

  const handleComplete = () => {
    setDone(true);
    if (focusTask?.id) {
      updateMutation.mutate(
        { id: focusTask.id, data: { status: "completed", completed_at: new Date().toISOString() } },
        { onSuccess: () => setTimeout(() => navigate("/"), 800) }
      );
    }
  };

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
        <Card className="w-full border-border bg-card shadow-none">
          <CardContent className="p-6 text-center">
            <p className="text-sm font-medium text-primary">Focus session</p>
            <h1 className="mt-3 text-2xl font-semibold text-foreground">
              {done ? "Session complete" : focusTask.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {paused ? "Paused" : "25 minutes reserved for one thing."}
            </p>
            <Progress className="mt-8" value={done ? 100 : paused ? 45 : 62} />
            <p className="mt-3 text-sm tabular-nums text-muted-foreground">
              {done ? "Done" : "15:32 remaining"}
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setPaused(!paused)}>
                <Pause className="size-4" />
              </Button>
              <Button onClick={handleComplete}>
                <Check className="size-4" />
                Complete
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setDone(false);
                  setPaused(false);
                }}
              >
                <TimerReset className="size-4" />
              </Button>
            </div>
            <Button variant="link" className="mt-5" onClick={() => navigate("/")}>
              <X className="size-4" />
              Exit focus
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
