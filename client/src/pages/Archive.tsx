import TaskRow from "../components/TaskRow";
import { useModelIndex, useModelUpdate } from "@rhino-dev/rhino-react";

export default function Archive() {
  const { data, isLoading: isPending } = useModelIndex("tasks");
  const tasks = (data as any)?.data || [];
  const updateMutation = useModelUpdate("tasks");

  const completedTasks = tasks.filter((t: any) => t.status === "completed");

  const restoreTask = (id: number | string) => {
    updateMutation.mutate({ id, data: { status: "pending", completed_at: null } });
  };

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
        <p className="text-sm text-muted-foreground">Completed history</p>
        <h1 className="text-2xl font-semibold text-foreground mb-4">Task Archive</h1>
        {isPending ? (
          <div className="py-10 text-center text-sm text-muted-foreground">Loading archive…</div>
        ) : completedTasks.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">No completed tasks in archive.</div>
        ) : (
          completedTasks.map((task: any) => (
            <TaskRow
              key={task.id}
              title={task.title}
              due="Completed"
              onComplete={() => restoreTask(task.id)}
              onDefer={() => {}}
              onOpenFocus={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
}
