import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/currency";

const Account = () => {
  const { user, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [profileName, setProfileName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate("/auth"); return; }
    supabase.from("orders").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setOrders((data as Order[]) ?? []);
    });
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle().then(({ data }) => {
      setProfileName((data as any)?.full_name ?? "");
    });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container py-12 md:py-16 max-w-4xl">
      <span className="eyebrow text-terracotta mb-4 block">Your account</span>
      <h1 className="font-display text-5xl md:text-6xl mb-2">Hello, <em>{profileName || user.email?.split("@")[0]}</em>.</h1>
      <p className="text-muted-foreground mb-12">{user.email}</p>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6 border-b border-border pb-4">
          <h2 className="font-display text-3xl">Orders</h2>
          <span className="eyebrow text-muted-foreground">{orders.length} total</span>
        </div>
        {orders.length === 0 ? (
          <p className="text-muted-foreground py-8">No orders yet. <button onClick={() => navigate("/shop")} className="underline hover:text-ink">Start browsing →</button></p>
        ) : (
          <div className="divide-y divide-border">
            {orders.map((o) => (
              <div key={o.id} className="py-6 grid grid-cols-4 gap-4 items-center">
                <div>
                  <div className="eyebrow text-muted-foreground">Order</div>
                  <div className="font-mono text-xs mt-1">#{o.id.slice(0, 8)}</div>
                </div>
                <div>
                  <div className="eyebrow text-muted-foreground">Date</div>
                  <div className="text-sm mt-1">{new Date(o.created_at).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="eyebrow text-muted-foreground">Status</div>
                  <div className="text-sm mt-1 capitalize">{o.status}</div>
                </div>
                <div className="text-right">
                  <div className="eyebrow text-muted-foreground">Total</div>
                  <div className="font-display text-xl mt-1 tabular-nums">{formatINR(Number(o.total))}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Button variant="ghost" onClick={signOut} className="eyebrow">Sign out</Button>
    </div>
  );
};

export default Account;
