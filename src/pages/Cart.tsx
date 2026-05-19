import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { formatINR, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/currency";

const Cart = () => {
  const { items, subtotal, update, remove, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container py-24 max-w-lg text-center">
        <h1 className="font-display text-4xl mb-4">Your cart awaits</h1>
        <p className="text-muted-foreground mb-8">Sign in to view items in your cart and check out.</p>
        <Button onClick={() => navigate("/auth")} className="rounded-none eyebrow h-12 px-8">Sign in</Button>
      </div>
    );
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  return (
    <div className="container py-12 md:py-16">
      <h1 className="font-display text-5xl md:text-6xl mb-12">Cart</h1>
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <div className="py-16 border-y border-border text-center">
          <p className="text-muted-foreground mb-6">Your cart is empty.</p>
          <Button asChild variant="ghost" className="eyebrow"><Link to="/shop">Continue shopping →</Link></Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 divide-y divide-border border-y border-border">
            {items.map((item) => (
              <div key={item.id} className="py-6 flex gap-6">
                <Link to={`/product/${item.product.id}`} className="w-24 h-32 bg-bone shrink-0 overflow-hidden">
                  {item.product.image_url && (
                    <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                  )}
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">{formatINR(Number(item.product.price))}</p>
                    </div>
                    <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-ink"><X className="h-4 w-4" /></button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-border">
                      <button onClick={() => update(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-bone">−</button>
                      <span className="px-3 tabular-nums text-sm">{item.quantity}</span>
                      <button onClick={() => update(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-bone">+</button>
                    </div>
                    <span className="font-display text-lg tabular-nums">{formatINR(Number(item.product.price) * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start bg-bone p-8">
            <h2 className="eyebrow mb-6">Order summary</h2>
            <div className="space-y-3 text-sm pb-6 border-b border-border">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="tabular-nums">{formatINR(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="tabular-nums">{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
            </div>
            <div className="flex justify-between items-baseline py-6 mb-6">
              <span className="eyebrow">Total</span>
              <span className="font-display text-3xl tabular-nums">{formatINR(subtotal + shipping)}</span>
            </div>
            <Button onClick={() => navigate("/checkout")} className="w-full rounded-none h-12 eyebrow">Checkout</Button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
