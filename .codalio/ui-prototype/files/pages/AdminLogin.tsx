import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { type FormEvent, useState } from "react";

export default function AdminLogin() {
    const [sent, setSent] = useState(false);
    const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };
  return (
   <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (<Card className="w-full border-border shadow-none"><CardHeader><ShieldCheck className="size-7 text-primary" /><CardTitle className="mt-3 text-2xl">Admin access</CardTitle></CardHeader><CardContent><form onSubmit={submit} className="space-y-4"><div className="space-y-2"><Label htmlFor="work-email">Work email</Label><Input id="work-email" type="email" required /></div><div className="space-y-2"><Label htmlFor="admin-password">Password</Label><Input id="admin-password" type="password" required /></div><Button className="w-full" type="submit">Continue<ArrowRight className="size-4" /></Button>{sent && <p className="text-center text-sm text-primary">Access request submitted.</p>}</form></CardContent></Card>)
      </div>
    </div>
  );
}