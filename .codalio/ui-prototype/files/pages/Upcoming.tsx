import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

import { CalendarDays, ChevronRight, Clock3 } from "lucide-react";
import { useState } from "react";

export default function Upcoming() {
    const [filter, setFilter] = useState("all");
    const [tasks, setTasks] = useState([{ title: "Review launch notes", group: "Tomorrow", time: "10 AM" }, { title: "Book dentist appointment", group: "This week", time: "Thu" }, { title: "Plan summer trip", group: "Later", time: "Jun" }]);
  return (
   <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (<><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Plan ahead</p><h1 className="text-2xl font-semibold text-foreground">Upcoming</h1></div><CalendarDays className="size-5 text-primary" /></div><Tabs value={filter} onValueChange={setFilter} className="mt-5"><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="week">This week</TabsTrigger></TabsList></Tabs><div className="mt-5">{tasks.filter((task) => filter === "all" || task.group === "This week").map((task) => <div key={task.title} className="flex min-h-14 items-center gap-3 border-b border-border/70 py-4"><div className="flex-1"><p className="font-medium text-foreground">{task.title}</p><p className="text-sm text-muted-foreground">{task.group}</p></div><Badge variant="secondary"><Clock3 className="mr-1 size-3" />{task.time}</Badge><Button variant="ghost" size="icon" onClick={() => setTasks((current) => current.filter((item) => item.title !== task.title))}><ChevronRight className="size-4" /></Button></div>)}</div></>)
      </div>
    </div>
  );
}