import { useState, type FormEvent } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth/sign_in", {
        email,
        password,
      });
      if (res.headers["access-token"]) {
        localStorage.setItem("access-token", res.headers["access-token"]);
        localStorage.setItem("client", res.headers["client"]);
        localStorage.setItem("uid", res.headers["uid"]);
        localStorage.setItem("expiry", res.headers["expiry"]);
      }
      navigate("/admin/analytics");
    } catch (err: any) {
      setError(err?.response?.data?.errors?.join(", ") || "Invalid credentials");
    }
  };

  return (
    <div className="w-full min-w-0 bg-background overflow-x-hidden p-4 max-w-md mx-auto">
      <Card className="w-full border-border shadow-none">
        <CardHeader>
          <p className="text-sm text-primary">Admin Access</p>
          <CardTitle className="text-2xl">SnapDo System Portal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            <Button className="w-full" type="submit">
              Sign In to Admin
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
