import TaskRow from "../components/TaskRow";
import { useModelIndex, useModelUpdate } from "@rhino-dev/rhino-react";

export default function Upcoming() {
  const { data, isLoading: isPending } = useModelIndex("tasks");
  const tasks = (data as any)?.data || [];
  const updateMutation = useModelUpdate("tasks");

  const upcomingTasks = tasks.filter((t: any) => t.status !== "completed");

  const completeTask = (id: number | string) => {
    updateMutation.mutate({ id, data: { status: "completed", completed_at: new Date().toISOString() } });
  };

  const deferTask = (id: number | string) => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    updateMutation.mutate({ id, data: { due_at: nextWeek.toISOString() } });
  };

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
        <p className="text-sm text-muted-foreground">Scheduled & deferred</p>
        <h1 className="text-2xl font-semibold text-foreground mb-4">Upcoming Tasks</h1>
        {isPending ? (
          <div className="py-10 text-center text-sm text-muted-foreground">Loading tasks…</div>
        ) : upcomingTasks.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">No upcoming scheduled tasks.</div>
        ) : (
          upcomingTasks.map((task: any) => (
            <TaskRow
              key={task.id}
              title={task.title}
              due={task.due_at ? new Date(task.due_at).toLocaleDateString() : "Upcoming"}
              onComplete={() => completeTask(task.id)}
              onDefer={() => deferTask(task.id)}
              onOpenFocus={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
}
