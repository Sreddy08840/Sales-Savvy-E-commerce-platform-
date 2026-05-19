import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { CartItem } from "@/lib/types";
import { toast } from "sonner";

type CartCtx = {
  items: CartItem[];
  loading: boolean;
  count: number;
  subtotal: number;
  add: (productId: string, qty?: number) => Promise<void>;
  update: (itemId: string, qty: number) => Promise<void>;
  remove: (itemId: string) => Promise<void>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
};

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select("id, product_id, quantity, product:products(*)")
      .eq("user_id", user.id);
    if (error) {
      toast.error("Couldn't load cart");
    } else {
      setItems((data as any) ?? []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = async (productId: string, qty = 1) => {
    if (!user) {
      toast.error("Please sign in to add to your cart");
      return;
    }
    const existing = items.find((i) => i.product_id === productId);
    if (existing) {
      await update(existing.id, existing.quantity + qty);
      return;
    }
    const { error } = await supabase
      .from("cart_items")
      .insert({ user_id: user.id, product_id: productId, quantity: qty });
    if (error) toast.error(error.message);
    else {
      toast.success("Added to cart");
      await refresh();
    }
  };

  const update = async (itemId: string, qty: number) => {
    if (qty < 1) return remove(itemId);
    const { error } = await supabase.from("cart_items").update({ quantity: qty }).eq("id", itemId);
    if (error) toast.error(error.message);
    else await refresh();
  };

  const remove = async (itemId: string) => {
    const { error } = await supabase.from("cart_items").delete().eq("id", itemId);
    if (error) toast.error(error.message);
    else await refresh();
  };

  const clear = async () => {
    if (!user) return;
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    setItems([]);
  };

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + Number(i.product?.price ?? 0) * i.quantity, 0);

  return (
    <Ctx.Provider value={{ items, loading, count, subtotal, add, update, remove, clear, refresh }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
};
