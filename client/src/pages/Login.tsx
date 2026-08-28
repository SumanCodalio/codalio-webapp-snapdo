import { useState, type FormEvent } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "@rhino-dev/rhino-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    const result = await auth.login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Invalid credentials");
    }
  };

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden p-4 max-w-md mx-auto">
      <Card className="w-full border-border shadow-none">
        <CardHeader>
          <p className="text-sm text-primary">Welcome back</p>
          <CardTitle className="text-2xl">Sign in to Snap</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            No account yet?{" "}
            <Link to="/signup" className="text-primary underline">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
