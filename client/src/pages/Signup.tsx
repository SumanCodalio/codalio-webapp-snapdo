import { useState, type FormEvent } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth", {
        name,
        email,
        password,
        password_confirmation: password,
      });
      if (res.headers["access-token"]) {
        localStorage.setItem("access-token", res.headers["access-token"]);
        localStorage.setItem("client", res.headers["client"]);
        localStorage.setItem("uid", res.headers["uid"]);
        localStorage.setItem("expiry", res.headers["expiry"]);
      }
      navigate("/onboarding");
    } catch (err: any) {
      setError(err?.response?.data?.errors?.full_messages?.join(", ") || "Signup failed");
    }
  };

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden p-4 max-w-md mx-auto">
      <Card className="w-full border-border shadow-none">
        <CardHeader>
          <p className="text-sm text-primary">Welcome to SnapDo</p>
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
        </CardContent>
      </Card>
    </div>
  );
}
