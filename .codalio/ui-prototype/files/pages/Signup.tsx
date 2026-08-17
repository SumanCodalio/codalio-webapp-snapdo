import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { ArrowRight } from "lucide-react";
import { type FormEvent, useState } from "react";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const submit = (event: FormEvent) => { event.preventDefault(); setSubmitted(true); };
  return (
   <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (
              (<Card className="w-full border-border shadow-none"><CardHeader><p className="text-sm text-primary">Welcome to SnapDo</p><CardTitle className="text-2xl">Keep every thought in motion</CardTitle></CardHeader><CardContent><form onSubmit={submit} className="space-y-4"><div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" value={name} onChange={(event) => setName(event.target.value)} required /></div><div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div><Label className="flex items-center gap-2 text-sm"><Checkbox checked={agreed} onCheckedChange={(value) => setAgreed(value === true)} />I agree to the terms</Label><Button className="w-full" type="submit" disabled={!agreed}>Create account<ArrowRight className="size-4" /></Button>{submitted && <p className="text-center text-sm text-primary">Account created — welcome, {name}.</p>}</form></CardContent></Card>)
      </div>
    </div>
  );
}