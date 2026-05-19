import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const emailSchema = z.string().trim().email("Please enter a valid email").max(255);
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(100);

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eRes = emailSchema.safeParse(email);
    if (!eRes.success) return toast.error(eRes.error.errors[0].message);
    const pRes = passwordSchema.safeParse(password);
    if (!pRes.success) return toast.error(pRes.error.errors[0].message);

    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: eRes.data,
        password: pRes.data,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { full_name: name },
        },
      });
      if (error) toast.error(error.message);
      else toast.success("Check your email to confirm your account");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: eRes.data, password: pRes.data });
      if (error) toast.error(error.message);
      else navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] grid md:grid-cols-2">
      <div className="hidden md:block bg-bone grain" />
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <span className="eyebrow text-terracotta mb-4 block">{mode === "signin" ? "Welcome back" : "Become a member"}</span>
          <h1 className="font-display text-5xl mb-10 leading-tight">
            {mode === "signin" ? <>The shop, <em>open</em>.</> : <>Join the <em>studio</em>.</>}
          </h1>
          <form onSubmit={submit} className="space-y-6">
            {mode === "signup" && (
              <div>
                <Label htmlFor="name" className="eyebrow text-muted-foreground">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-none border-x-0 border-t-0 border-b px-0 mt-2 focus-visible:ring-0" />
              </div>
            )}
            <div>
              <Label htmlFor="email" className="eyebrow text-muted-foreground">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-none border-x-0 border-t-0 border-b px-0 mt-2 focus-visible:ring-0" />
            </div>
            <div>
              <Label htmlFor="password" className="eyebrow text-muted-foreground">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-none border-x-0 border-t-0 border-b px-0 mt-2 focus-visible:ring-0" />
            </div>
            <Button type="submit" disabled={loading} className="w-full rounded-none h-12 eyebrow mt-4">
              {loading ? "…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-8 text-sm text-muted-foreground hover:text-ink"
          >
            {mode === "signin" ? "New here? Create an account →" : "Already have an account? Sign in →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
