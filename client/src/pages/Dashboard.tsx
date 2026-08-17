import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useModelIndex } from "@rhino-dev/rhino-react";

export default function Dashboard() {
  const { data, isLoading: isPending } = useModelIndex("task");
  const tasks = (data as any)?.results || [];

  const completed = tasks.filter((t: any) => t.status === "completed").length;
  const pending = tasks.filter((t: any) => t.status !== "completed").length;

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Personal Momentum</p>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-border shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{isPending ? "-" : pending}</div>
            </CardContent>
          </Card>
          <Card className="border-border shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Completed Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{isPending ? "-" : completed}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
