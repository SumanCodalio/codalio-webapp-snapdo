import { useState, type FormEvent } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowRight } from "lucide-react";
import { api, useAuth } from "@rhino-dev/rhino-react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      // Rhino's own /api/auth/register only accepts invited users, so open
      // signup goes to the app's endpoint. Signing in afterwards keeps token
      // storage in one place instead of writing it from here too.
      await api.post("/signup", {
        name,
        email,
        password,
        password_confirmation: password,
      });
      const result = await auth.login(email, password);
      if (!result.success) {
        setError(result.error || "Signup failed");
        return;
      }
      navigate("/onboarding");
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      setError(
        errors
          ? Object.entries(errors)
              .map(([field, messages]) => `${field} ${(messages as string[]).join(", ")}`)
              .join("; ")
          : "Signup failed"
      );
    }
  };

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden p-4 max-w-md mx-auto">
      <Card className="w-full border-border shadow-none">
        <CardHeader>
          <p className="text-sm text-primary">Welcome to Snap</p>
          <CardTitle className="text-2xl">Keep every thought in motion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(event) => setName(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <Checkbox checked={agreed} onCheckedChange={(value) => setAgreed(value === true)} />
              I agree to the terms
            </Label>
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            <Button className="w-full" type="submit" disabled={!agreed}>
              Create account
              <ArrowRight className="size-4" />
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
