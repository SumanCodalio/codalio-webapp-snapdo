import { useState, type FormEvent } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import QuickCaptureButton from "../components/QuickCaptureButton";
import TaskRow from "../components/TaskRow";
import { ArrowUp, Check, Mic } from "lucide-react";
import { useModelIndex, useModelStore, useModelUpdate } from "@rhino-dev/rhino-react";
import { useBaseOwnerId } from "../contexts/AppOwnerProvider";

export default function Landing() {
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState("");
  const baseOwnerId = useBaseOwnerId();

  const { data: indexData, isLoading: isPending } = useModelIndex("tasks");
  const tasks = (indexData as any)?.data || (indexData as any)?.results || [];

  const createMutation = useModelStore("tasks");
  const updateMutation = useModelUpdate("tasks");

  const completeTask = (id: number | string) => {
    updateMutation.mutate({ id, data: { status: "completed", completed_at: new Date().toISOString() } });
  };

  const deferTask = (id: number | string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    updateMutation.mutate({ id, data: { due_at: tomorrow.toISOString() } });
  };

  const addTask = (event: FormEvent) => {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;
    createMutation.mutate(
      {
        data: {
          title,
          status: "pending",
          organization_id: baseOwnerId,
        },
      },
      {
        onSuccess: () => setDraft(""),
      }
    );
  };

  const openTasks = tasks.filter((t: any) => t.status !== "completed");

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="w-full min-w-0">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-primary">{todayStr}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">Today</h1>
          </div>
          <Badge variant="secondary">{openTasks.length} open</Badge>
        </div>
        <div className="flex-1">
          {isPending ? (
            <div className="py-10 text-center text-sm text-muted-foreground">Loading tasks…</div>
          ) : openTasks.length ? (
            openTasks.map((task: any) => (
              <TaskRow
                key={task.id}
                title={task.title}
                due={task.due_at ? new Date(task.due_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Today"}
                onComplete={() => completeTask(task.id)}
                onDefer={() => deferTask(task.id)}
                onOpenFocus={() => setFocused(task.title)}
              />
            ))
          ) : (
            <div className="grid place-items-center py-20 text-center">
              <div>
                <Check className="mx-auto mb-3 size-8 text-primary" />
                <p className="font-medium text-foreground">Clear the list.</p>
                <p className="mt-1 text-sm text-muted-foreground">Capture the next thing.</p>
              </div>
            </div>
          )}
          {focused && (
            <div className="mt-5 rounded-xl border border-primary/30 bg-accent p-4">
              <p className="text-sm font-medium text-accent-foreground">Focus mode: {focused}</p>
              <Button size="sm" variant="link" className="mt-1 h-auto px-0" onClick={() => setFocused("")}>
                Exit focus
              </Button>
            </div>
          )}
        </div>
        <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-2xl border-t border-border bg-background/95 p-4 backdrop-blur">
          <form onSubmit={addTask} className="flex items-center gap-2">
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Add a task… “Call Maya tomorrow at 5pm”"
              className="min-h-12 rounded-xl bg-card text-base"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setDraft("Voice note: schedule the brief for Friday")}
                    aria-label="Voice capture"
                  >
                    <Mic className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Capture by voice</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button type="submit" size="icon" className="size-11 rounded-xl" aria-label="Save task">
              <ArrowUp className="size-5" />
            </Button>
          </form>
          <div className="mt-2 flex items-center justify-between px-1">
            <p className="text-xs text-muted-foreground">Dates and priority are understood automatically</p>
            <QuickCaptureButton onVoiceCapture={() => setDraft("Voice note: ")} />
          </div>
        </div>
      </div>
    </div>
  );
}
